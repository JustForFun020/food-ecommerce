import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entity/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find({
      relations: [
        'products',
        'products.images',
        'products.rates',
        'products.categories',
      ],
    });
  }

  async getCategoryByName(name: string) {
    const category = await this.categoriesRepository.findOne({
      where: { name },
      relations: [
        'products',
        'products.images',
        'products.rates',
        'products.categories',
      ],
    });
    if (!category) {
      throw new HttpException('Category not found', 404);
    }
    return category;
  }
}
