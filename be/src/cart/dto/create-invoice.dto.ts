import { Field, InputType } from '@nestjs/graphql';
import { CreateCartDto } from './create-cart.dto';

@InputType()
export class CreateInvoiceDto {
  @Field(() => CreateCartDto)
  cart: CreateCartDto;
}
