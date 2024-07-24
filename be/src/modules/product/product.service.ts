import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from 'graphql-upload/processRequest.mjs';

import { Product } from '../../common/entity/productEntity/product.entity';
import { ProductImage } from '../../common/entity/productEntity/product-image.entity';
import { Categories } from 'src/common/entity/categoriesEntity/categories.entity';
import { ProductTag } from '../../common/entity/productEntity/product-tag.entity';
import { CreateProductDto } from '../../common/dto/productDto/create-product.dto';
import { UpdateProductDto } from '../../common/dto/productDto/update-product.dto';
import { UploadImageDto } from '../../common/dto/productDto/upload-image.dto';
import { CreateCategoriesDto } from 'src/common/dto/categoriesDto/create-category.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
    private readonly entityManager: EntityManager,
  ) {}

  async createProduct(
    createProduct: CreateProductDto,
    uploadImage: UploadImageDto,
  ): Promise<Product> {
    const { name, categories, tags: tagsDto } = createProduct;

    await this.checkProductExists(name);
    const category = await this.findOrCreateCategory(categories);
    const tags = await this.findOrCreateTags(tagsDto);
    const imagePath = await this.uploadProductImage(await uploadImage.image);

    const product = this.productRepository.create({
      ...createProduct,
      categories: category,
      tags,
    });
    const savedProduct = await this.productRepository.save(product);

    await this.createProductImage(savedProduct, imagePath);

    return this.getProductById(savedProduct.id);
  }

  private async checkProductExists(name: string): Promise<void> {
    const existingProduct = await this.productRepository.findOne({
      where: { name },
    });
    if (existingProduct) {
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);
    }
  }

  private async findOrCreateCategory(
    category: CreateCategoriesDto,
  ): Promise<Categories> {
    const existingCategory = await this.categoriesRepository.findOne({
      where: { name: category.name },
    });
    if (existingCategory) return existingCategory;

    const newCategory = this.categoriesRepository.create({
      name: category.name,
    });
    return this.categoriesRepository.save(newCategory);
  }

  private async findOrCreateTags(tagNames: string[]): Promise<ProductTag[]> {
    return Promise.all(
      tagNames.map(async (name) => {
        let tag = await this.productTagRepository.findOne({ where: { name } });
        if (!tag) {
          tag = this.productTagRepository.create({ name });
          tag = await this.productTagRepository.save(tag);
        }
        return tag;
      }),
    );
  }

  private async createProductImage(
    product: Product,
    imagePath: string,
  ): Promise<void> {
    const productImage = this.productImageRepository.create({
      image: imagePath,
      product,
    });
    await this.productImageRepository.save(productImage);
  }

  async uploadProductImage(file: FileUpload): Promise<string> {
    const stream = file.createReadStream();
    const path = join(
      __dirname,
      '..',
      '..',
      '..',
      `/uploads/${uuidv4()}-${file.filename}`,
    );
    console.log(path);
    await new Promise((resolve, reject) => {
      stream
        .pipe(createWriteStream(path))
        .on('finish', resolve)
        .on('error', reject);
    });
    return path;
  }

  async getProductByName(name: string): Promise<Product> {
    return this.productRepository.findOne({
      where: { name },
      relations: ['images', 'categories', 'tags', 'rates', 'rates.user'],
    });
  }

  async getAllProducts(pagination: number, limit: number) {
    const [products, total] = await this.productRepository.findAndCount({
      relations: ['images', 'categories', 'tags'],
      take: limit,
      skip: (pagination - 1) * limit,
    });

    return {
      data: products,
      total,
      page: pagination,
    };
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['images', 'categories', 'tags'],
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async getProductByCategory(category: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { categories: { name: category } },
      relations: ['images', 'categories', 'tags'],
    });
  }

  async updateProduct(updateProductDto: UpdateProductDto): Promise<Product> {
    const { id, tags, ...updateFields } = updateProductDto;

    const product = await this.getProductById(id);

    if (tags) {
      product.tags = await this.findOrCreateTags(tags);
    }

    Object.assign(product, updateFields);

    try {
      await this.productRepository.save(product);
      return this.getProductById(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error updating product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = await this.getProductById(id);

    try {
      await this.productRepository.remove(product);
      return product;
    } catch (error) {
      throw new HttpException(
        'Error deleting product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchProduct(name: string): Promise<Product[]> {
    return this.entityManager.query(
      `SELECT * FROM product WHERE name LIKE '%${name}%'`,
    );
  }
}
