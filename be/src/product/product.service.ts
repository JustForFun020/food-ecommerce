import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { EntityManager, Repository } from 'typeorm';
import { ProductImage } from './entity/product-image.entity';
import { FileUpload } from 'graphql-upload/processRequest.mjs';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UploadImageDto } from './dto/upload-image.dto';
import { Categories } from 'src/categories/entity/categories.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductTag } from './entity/product-tag.entity';

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
    const alreadyExistsProduct = await this.productRepository.findOne({
      where: { name },
    });

    const { name: categoriesName } = categories;
    const alreadyExistsCategory = await this.categoriesRepository.findOne({
      where: { name: categoriesName },
    });

    const tags = await Promise.all(
      tagsDto.map(async (tag) => {
        return await this.productTagRepository.findOne({
          where: { name: tag },
        });
      }),
    );

    if (!alreadyExistsCategory) {
      const category = this.categoriesRepository.create(categories);
      const savedCategory = await this.categoriesRepository.save(category);
      createProduct.categories = savedCategory;
    } else {
      createProduct.categories = alreadyExistsCategory;
    }

    if (alreadyExistsProduct) {
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);
    }

    const file = await uploadImage.image;
    const imagePath = await this.uploadProductImage(file);

    const product = this.productRepository.create({
      ...createProduct,
      tags,
    });
    const productImage = this.productImageRepository.create({
      image: imagePath,
      product,
    });

    const savedProduct = await this.productRepository.save(product);

    productImage.product = savedProduct;
    await this.productImageRepository.save(productImage);

    return this.productRepository.findOne({
      where: { id: savedProduct.id },
      relations: ['images'],
    });
  }

  async uploadProductImage(file: FileUpload) {
    const stream = file.createReadStream();
    const path = join(
      __dirname,
      '..',
      '..',
      `/uploads/${uuidv4()}-${file.filename}`,
    );
    await new Promise((resolve, reject) => {
      stream
        .pipe(createWriteStream(path))
        .on('finish', resolve)
        .on('error', reject);
    });
    return path;
  }

  async getProductByName(name: string): Promise<Product> {
    const products = await this.productRepository.findOne({
      where: { name },
      relations: ['images', 'categories', 'tags', 'rates', 'rates.user'],
    });
    return products;
  }

  async getAllProducts(pagination: number, limit: number) {
    const allProduct = await this.productRepository.find({
      relations: ['images', 'categories', 'tags'],
      take: limit,
      skip: (pagination - 1) * limit,
    });
    const totalProduct = await this.productRepository.count();
    return {
      data: allProduct,
      total: totalProduct,
      page: pagination,
    };
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['images', 'categories', 'tags'],
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async getProductByCategory(category: string) {
    const products = await this.productRepository.find({
      where: { categories: { name: category } },
      relations: ['images', 'categories', 'tags'],
    });
    return products;
  }

  async updateProduct(updateProduct: UpdateProductDto) {
    const { id, tags } = updateProduct;

    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    let tagsEntity: ProductTag[] = [];
    if (tags) {
      tagsEntity = await Promise.all(
        tags.map(async (tag) => {
          return await this.productTagRepository.findOne({
            where: { name: tag },
          });
        }),
      );
    }

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    const { name, description, price } = updateProduct;
    try {
      await this.productRepository.update(id, {
        name,
        description,
        price,
      });
      product.tags = tagsEntity;
      await this.productRepository.save(product);

      return this.productRepository.findOne({
        where: { id },
        relations: ['images', 'categories', 'tags'],
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteProduct(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    try {
      await this.productRepository.delete(id);
      return product;
    } catch (error) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchProduct(name: string) {
    const products = await this.entityManager.query(
      `SELECT * FROM product WHERE name LIKE '%${name}%'`,
    );
    return products;
  }
}
