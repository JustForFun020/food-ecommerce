import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductPaymentDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  quantity: number;
}
