import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './entity/categories.entity';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { Product } from 'src/product/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Product])],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
