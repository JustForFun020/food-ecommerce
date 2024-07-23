import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { EntityManager, Repository } from 'typeorm';

import { User } from '../entity/userEntity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwtSecretKey',
    });
  }

  async validate(payload: { id: any }) {
    const { id } = payload;
    const user = await this.userRepository.findOne({
      where: { id },
    });
    const roles = await this.entityManager.query(
      'select r.name from user_roles ur join role r where ur.userId = ? and ur.roleId = r.id',
      [id],
    );
    if (!user) {
      throw new UnauthorizedException('Please login first');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return { ...result, roles };
  }
}
