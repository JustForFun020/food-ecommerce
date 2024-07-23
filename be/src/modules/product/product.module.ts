import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { Product } from '../../common/entity/productEntity/product.entity';
import { ProductImage } from '../../common/entity/productEntity/product-image.entity';
import { Categories } from 'src/common/entity/categoriesEntity/categories.entity';
import { ProductTag } from '../../common/entity/productEntity/product-tag.entity';
import { Invoice } from 'src/common/entity/invoiceEntity/invoice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImage,
      Categories,
      ProductTag,
      Invoice,
    ]),
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
