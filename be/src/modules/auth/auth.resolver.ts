import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject, UseInterceptors } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from '../../common/decorator/isPublic.decorator';
import { LoginResponse } from '../../common/response/login.response';
import { SignUpResponse } from '../../common/response/sign-up.response';
import { LoginDto } from '../../common/dto/authDto/login.dto';
import { SignUpDto } from '../../common/dto/authDto/sign-up.dto';
import { AuthInterceptor } from '../../common/interceptor/auth.interceptor';

@Public()
@Resolver()
export class AuthResolver {
  constructor(
    @Inject()
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => LoginResponse)
  @UseInterceptors(AuthInterceptor)
  async login(@Args('loginDto') loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Mutation(() => SignUpResponse)
  async signup(@Args('signUpDto') signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }
}
