import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateCartDto } from './create-cart.dto';

@InputType()
export class CreateCartProductsDto {
  @IsNumber()
  @Field()
  quantity: number;

  @Field()
  pid: number;

  @Field(() => CreateCartDto)
  carts: CreateCartDto;
}
