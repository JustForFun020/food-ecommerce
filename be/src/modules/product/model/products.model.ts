import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../../../common/entity/productEntity/product.entity';

@ObjectType()
export class Products {
  @Field(() => [Product])
  data: Product[];

  @Field()
  total: number;
}
