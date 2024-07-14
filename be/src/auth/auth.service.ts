import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly entityManager: EntityManager,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { username } });
    const isPassword = await bcrypt.compare(password, user.password);
    if (user && isPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { username } });
    const isPassword = await bcrypt.compare(password, user.password);
    if (!user || !isPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const role = await this.entityManager.query(
      `SELECT roleId FROM meee.user_roles WHERE userId = ${user.id}`,
    );

    const token = this.jwtService.sign({ id: user.id, role });
    return {
      token,
    };
  }

  async signup(signUpDto: SignUpDto) {
    const { username, password, email } = signUpDto;

    const user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const emailExists = await this.userRepository.findOne({ where: { email } });
    if (emailExists) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const randomId = Math.floor(Math.random() * 100000000);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      id: randomId,
      roles: [
        {
          id: 2,
          name: 'USER',
        },
      ],
    });

    await this.userRepository.save(newUser);

    const role = await this.entityManager.query(
      `SELECT roleId FROM meee.user_roles WHERE userId = ${newUser.id}`,
    );

    const token = this.jwtService.sign({ id: newUser.id, role });
    return {
      token,
    };
  }
}
