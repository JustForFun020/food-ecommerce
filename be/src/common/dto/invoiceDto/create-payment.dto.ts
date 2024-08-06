import { Field, InputType } from '@nestjs/graphql';
import { CreateProductPaymentDto } from './create-payment-products.dto';

@InputType()
export class CreatePaymentDto {
  @Field()
  paymentId: string;

  @Field()
  clientName: string;

  @Field()
  uid: number;

  @Field()
  clientEmail: string;

  @Field()
  clientSecret: string;

  @Field(() => [String])
  paymentMethod: string[];

  @Field(() => [CreateProductPaymentDto])
  products: CreateProductPaymentDto[];

  @Field()
  status: string;

  @Field()
  amount: number;

  @Field()
  currency: string;
}
