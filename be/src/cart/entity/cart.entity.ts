import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Invoice } from './invoice.entity';
import { User } from 'src/user/entity/user.entity';
import { CartProducts } from './cart-products.entity';

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

  @OneToOne(() => Invoice, (invoice) => invoice.cart)
  @Field(() => Invoice, { nullable: true })
  invoice: Invoice;

  @ManyToOne(() => User, (user) => user.carts)
  @Field(() => User)
  user: User;

  @OneToMany(() => CartProducts, (cartProducts) => cartProducts.cart)
  @Field(() => [CartProducts])
  cartProducts: CartProducts[];
}
