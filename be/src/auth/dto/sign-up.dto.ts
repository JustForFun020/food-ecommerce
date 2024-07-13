import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class SignUpDto {
  @IsNotEmpty()
  @Field()
  username: string;

  @IsNotEmpty()
  @Field()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsOptional()
  @Field(() => CreateRoleDto, { nullable: true })
  roles: CreateRoleDto[];
}

@InputType()
export class CreateRoleDto {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  id: number;
}
