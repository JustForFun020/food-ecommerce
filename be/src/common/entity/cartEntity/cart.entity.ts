import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from 'src/database/abstract.entity';
import { CartProducts } from './cart-products.entity';
import { User } from '../userEntity/user.entity';

@Entity()
@ObjectType()
export class Cart extends AbstractEntity<Cart> {
  @Column({ default: 'Cart' })
  @Field({ defaultValue: 'Cart' })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  topic: string;

  @ManyToOne(() => User, (user) => user.carts)
  @Field(() => User)
  user: User;

  @OneToMany(() => CartProducts, (cartProducts) => cartProducts.cart, {
    cascade: true,
  })
  @Field(() => [CartProducts])
  cartProducts: CartProducts[];
}
