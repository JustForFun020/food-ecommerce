import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { AbstractEntity } from 'src/database/abstract.entity';
import { ProductImage } from './product-image.entity';
import { Categories } from 'src/common/entity/categoriesEntity/categories.entity';
import { Rate } from 'src/common/entity/rateEntity/rate.entity';
import { CartProducts } from 'src/common/entity/cartEntity/cart-products.entity';
import { ProductTag } from './product-tag.entity';
import { Invoice } from 'src/common/entity/invoiceEntity/invoice.entity';

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

  @ManyToMany(() => ProductTag, (ptag) => ptag.products, {
    cascade: true,
    eager: true,
  })
  @Field(() => [ProductTag])
  @JoinTable({ name: 'product_tag' })
  tags: ProductTag[];

  @ManyToMany(() => Invoice, (invoice) => invoice.products)
  @Field(() => [Invoice])
  invoices: Invoice[];

  @Field()
  get averageRate(): number {
    if (!this.rates || this.rates.length === 0) {
      return 0;
    }
    return parseFloat(
      (
        this.rates.reduce((acc, rate) => acc + rate.score, 0) /
        this.rates.length
      ).toFixed(2),
    );
  }
}
