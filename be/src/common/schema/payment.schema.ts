import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaymentProduct } from './payment-product.schme';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Payment {
  @Field()
  @Prop()
  paymentId: string;

  @Field()
  @Prop()
  clientName: string;

  @Field()
  @Prop()
  uid: number;

  @Field()
  @Prop()
  clientEmail: string;

  @Field()
  @Prop()
  clientSecret: string;

  @Field(() => [String])
  @Prop()
  paymentMethod: string[];

  @Field(() => [PaymentProduct])
  @Prop()
  products: PaymentProduct[];

  @Field()
  @Prop()
  status: string;

  @Field()
  @Prop()
  amount: number;

  @Field()
  @Prop()
  currency: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
