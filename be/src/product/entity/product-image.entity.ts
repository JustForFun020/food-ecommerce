import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@ObjectType()
@Entity({
  name: 'product_image',
})
export class ProductImage extends AbstractEntity<ProductImage> {
  @Column()
  @Field()
  image: string;

  @Field()
  get imageUrl(): string {
    return `http://localhost:5000${this.image.replace('/app', '')}`;
  }

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
