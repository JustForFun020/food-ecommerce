import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  address: string;

  @Field()
  @IsString()
  phone: string;

  @Field()
  @IsEmail()
  email: string;
}
