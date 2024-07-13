import { Injectable } from '@nestjs/common';
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
    return await this.categoriesRepository.find();
  }

  async getCategory(name: string) {
    return await this.categoriesRepository.find({
      where: { name },
      relations: ['products'],
    });
  }

  async getCategoryByName(name: string) {
    const category = await this.categoriesRepository.findOne({
      where: { name },
      relations: ['products', 'products.images', 'products.rates'],
    });
    return category;
  }
}
