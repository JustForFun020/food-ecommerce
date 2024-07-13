import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { Categories } from 'src/categories/entity/categories.entity';
import { Rate } from 'src/rate/entity/rate.entity';
import { CartProducts } from 'src/cart/entity/cart-products.entity';
import { ProductTag } from './product-tag.entity';

@ObjectType()
@Entity()
export class Product extends AbstractEntity<Product> {
  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  price: number;

  @Column({ type: 'text' })
  @Field()
  description: string;

  @Column()
  @Field()
  amount: number;

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  @Field(() => [ProductImage])
  images: ProductImage[];

  @OneToMany(() => Rate, (rate) => rate.product, { cascade: true })
  @Field(() => [Rate], { nullable: true })
  rates: Rate[];

  @ManyToOne(() => Categories, (categories) => categories.products, {
    cascade: true,
  })
  @Field(() => Categories)
  categories: Categories;

  @OneToMany(() => CartProducts, (cartProducts) => cartProducts.product)
  @Field(() => [CartProducts])
  cartProducts: CartProducts[];

  @ManyToMany(() => ProductTag, (ptag) => ptag.products)
  @Field(() => [ProductTag])
  tags: ProductTag[];
}
