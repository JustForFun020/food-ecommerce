import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductImage } from './entity/product-image.entity';
import { Tag } from './entity/tag.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { Categories } from 'src/categories/entity/categories.entity';
import { ProductTag } from './entity/product-tag.entity';
import { Invoice } from 'src/invoice/entity/invoice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImage,
      Tag,
      Categories,
      ProductTag,
      Invoice,
    ]),
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
