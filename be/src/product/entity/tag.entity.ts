import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Product } from './product.entity';

@ObjectType()
@Entity()
export class Tag extends AbstractEntity<Tag> {
  @Field()
  @Column()
  name: string;

  @ManyToMany(() => Product, { cascade: true })
  @Field(() => [Product])
  @JoinTable({ name: 'product_tag' })
  products: Product[];
}
