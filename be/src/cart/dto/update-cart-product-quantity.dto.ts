import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateCartProductQuantityDto {
  @IsNumber()
  @Field()
  quantity: number;

  @IsNumber()
  @Field()
  pid: number;

  @IsNumber()
  @Field()
  cid: number;
}
