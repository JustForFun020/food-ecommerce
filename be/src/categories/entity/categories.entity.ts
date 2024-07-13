import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Product } from 'src/product/entity/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Categories extends AbstractEntity<Categories> {
  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'text' })
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Product, (product) => product.categories)
  @Field(() => [Product])
  products: Product[];
}
