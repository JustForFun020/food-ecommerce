import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { Categories } from 'src/common/entity/categoriesEntity/categories.entity';
import { Product } from 'src/common/entity/productEntity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Product])],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
