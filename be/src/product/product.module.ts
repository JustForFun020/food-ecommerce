import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductImage } from './entity/product-image.entity';
import { Tag } from './entity/tag.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { Categories } from 'src/categories/entity/categories.entity';
import { ProductTag } from './entity/product-tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImage,
      Tag,
      Categories,
      ProductTag,
    ]),
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
