import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateCartDto {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  description: string;

  @IsString()
  @Field()
  topic: string;

  @Field()
  uid: number;
}
