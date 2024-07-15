import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entity/categories.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entity/product.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
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

  async deleteCategory(id: number) {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new HttpException('Category not found', 404);
    }
    await this.categoriesRepository.delete(id);
    return 'Category deleted successfully';
  }

  async deleteProductFromCategory(categoryId: number, productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new HttpException('Product not found', 404);
    }
    await this.productRepository.delete(productId);
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
      relations: ['products'],
    });
    if (!category) {
      throw new HttpException('Category not found', 404);
    }
    return category;
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const { name, description, id } = updateCategoryDto;
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new HttpException('Category not found', 404);
    }
    const newCategory = new Categories({
      ...category,
      name,
      description,
    });
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }
}
