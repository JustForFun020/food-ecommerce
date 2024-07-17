import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceDto {
  @Field()
  cartId: number;

  @Field()
  name: string;

  @Field()
  price: number;
}
