import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateCartProductsDto {
  @IsNumber()
  @Field()
  quantity: number;

  @Field()
  pid: number;

  @Field()
  cid: number;

  @Field()
  uid: number;
}
