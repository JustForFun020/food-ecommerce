import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateRateDto {
  @IsNotEmpty()
  @IsNumber()
  @Field()
  score: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  comment: string;

  @IsString()
  @Field()
  name: string;

  @Field()
  uid: number;
}
