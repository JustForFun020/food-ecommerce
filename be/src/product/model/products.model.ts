import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../entity/product.entity';

@ObjectType()
export class Products {
  @Field(() => [Product])
  data: Product[];

  @Field()
  total: number;
}
