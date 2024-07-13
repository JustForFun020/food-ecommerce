import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateBasicInformationCartDto {
  @IsNumber()
  @Field()
  cid: number;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  description: string;

  @IsString()
  @Field()
  topic: string;
}
