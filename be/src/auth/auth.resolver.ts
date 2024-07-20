import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './response/login.response';
import { Public } from './decorator/isPublic.decorator';
import { SignUpResponse } from './response/sign-up.response';
import { SignUpDto } from './dto/sign-up.dto';
import { Inject, UseInterceptors } from '@nestjs/common';
import { AuthInterceptor } from './interceptor/auth.interceptor';
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
