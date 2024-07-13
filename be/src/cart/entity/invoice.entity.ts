import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Product } from 'src/product/entity/product.entity';
import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
@ObjectType()
export class Invoice extends AbstractEntity<Invoice> {
  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column()
  @Field()
  price: number;

  @ManyToMany(() => Product, { cascade: true })
  @Field(() => [Product])
  products: Product[];

  @OneToOne(() => Cart, (cart) => cart.invoice)
  @Field(() => Cart)
  @JoinColumn()
  cart: Cart;
}
