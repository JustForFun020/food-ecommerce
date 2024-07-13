import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';

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
