import { Field, InputType } from '@nestjs/graphql';
import { CreateCartProductsDto } from './create-cart-products.dto';

@InputType()
export class UpdateCartDto {
  @Field()
  name: string;

  @Field()
  topic: string;

  @Field()
  description: string;

  @Field(() => [CreateCartProductsDto])
  cartProducts: CreateCartProductsDto[];

  @Field()
  uid: number;

  @Field()
  cid: number;
}
