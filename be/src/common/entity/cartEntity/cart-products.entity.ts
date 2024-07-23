import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { Cart } from './cart.entity';
import { Product } from '../productEntity/product.entity';
import { AbstractEntity } from 'src/database/abstract.entity';

@ObjectType()
@Entity()
export class CartProducts extends AbstractEntity<CartProducts> {
  @ManyToOne(() => Cart, (cart) => cart.cartProducts)
  @Field(() => Cart)
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartProducts, {
    cascade: true,
  })
  @Field(() => Product)
  product: Product;

  @Column()
  @Field()
  quantity: number;
}
