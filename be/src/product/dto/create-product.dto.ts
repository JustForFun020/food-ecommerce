import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateCategoriesDto } from 'src/categories/dto/create-category.dto';
import { UploadImageDto } from './upload-image.dto';

@InputType()
export class CreateProductDto {
  @IsString()
  @Field()
  name: string;

  @IsNumber()
  @Field()
  price: number;

  @IsString()
  @Field()
  description: string;

  @IsNumber()
  @Field()
  amount: number;

  @IsNotEmpty()
  @Field(() => CreateCategoriesDto)
  categories: CreateCategoriesDto;

  @Field(() => UploadImageDto, { nullable: true })
  @IsOptional()
  image: UploadImageDto;
}
