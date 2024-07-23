import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

import { LoginDto } from 'src/common/dto/authDto/login.dto';
import { UpdateProductDto } from '../productDto/update-product.dto';

@InputType()
export class UpdateRateDto {
  @Field()
  @IsNumber()
  rating: number;

  @Field()
  @IsString()
  comment: string;

  @Field(() => LoginDto)
  user: LoginDto;

  @Field(() => UpdateProductDto)
  product: UpdateProductDto;
}
