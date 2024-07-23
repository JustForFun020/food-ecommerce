import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from '../dto/authDto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({});
  }

  async validate(loginDto: LoginDto) {
    console.log('local strategy');
    return this.authService.validateUser(loginDto);
  }
}
