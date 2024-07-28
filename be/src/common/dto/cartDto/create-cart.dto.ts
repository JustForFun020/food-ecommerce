import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @Field(() => [Number], { nullable: true, defaultValue: [] })
  pid: number[];
}
