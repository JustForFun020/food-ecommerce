import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceDto {
  @Field()
  userId: number;

  @Field()
  name: string;

  @Field()
  price: number;
}
