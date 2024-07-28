import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentProduct {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  quantity: number;
}
