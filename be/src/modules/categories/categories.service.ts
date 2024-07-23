import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Categories } from '../../common/entity/categoriesEntity/categories.entity';
import { Product } from 'src/common/entity/productEntity/product.entity';
import { UpdateCategoryDto } from '../../common/dto/categoriesDto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  private readonly categoryRelations = [
    'products',
    'products.images',
    'products.rates',
    'products.categories',
  ];

  async getCategories(): Promise<Categories[]> {
    return this.categoriesRepository.find({
      relations: this.categoryRelations,
    });
  }

  async getCategoryByName(name: string): Promise<Categories> {
    const category = await this.categoriesRepository.findOne({
      where: { name },
      relations: this.categoryRelations,
    });

    if (!category) {
      throw this.createNotFoundException('Category');
    }

    return category;
  }

  async deleteCategory(id: number): Promise<string> {
    const category = await this.findCategoryById(id);
    await this.categoriesRepository.remove(category);
    return 'Category deleted successfully';
  }

  async deleteProductFromCategory(
    categoryId: number,
    productId: number,
  ): Promise<Categories> {
    const product = await this.findProductById(productId);
    await this.productRepository.remove(product);

    const category = await this.findCategoryById(categoryId, ['products']);
    return category;
  }

  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Categories> {
    const { id, ...updateData } = updateCategoryDto;
    const category = await this.findCategoryById(id);

    Object.assign(category, updateData);
    return this.categoriesRepository.save(category);
  }

  private async findCategoryById(
    id: number,
    relations: string[] = [],
  ): Promise<Categories> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations,
    });

    if (!category) {
      throw this.createNotFoundException('Category');
    }

    return category;
  }

  private async findProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw this.createNotFoundException('Product');
    }

    return product;
  }

  private createNotFoundException(entityName: string): HttpException {
    return new HttpException(`${entityName} not found`, HttpStatus.NOT_FOUND);
  }
}
