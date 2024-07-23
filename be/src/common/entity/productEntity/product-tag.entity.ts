import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany } from 'typeorm';

import { AbstractEntity } from 'src/database/abstract.entity';
import { Product } from './product.entity';

@Entity({
  name: 'tag',
})
@ObjectType()
export class ProductTag extends AbstractEntity<ProductTag> {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @ManyToMany(() => Product, (product) => product.tags)
  @Field(() => [Product])
  products: Product[];
}
