import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

import { ProductService } from './product.service';
import { Products } from './model/products.model';
import { Product } from '../../common/entity/productEntity/product.entity';
import { Roles } from 'src/common/decorator/role.decorator';
import { Public } from 'src/common/decorator/isPublic.decorator';
import { UserRolesGuard } from 'src/common/guard/user-roles.guard';
import { CreateProductDto } from '../../common/dto/productDto/create-product.dto';
import { UploadImageDto } from '../../common/dto/productDto/upload-image.dto';
import { UpdateProductDto } from '../../common/dto/productDto/update-product.dto';

@Public()
@Resolver()
export class ProductResolver {
  constructor(
    @Inject(ProductService)
    private readonly productService: ProductService,
  ) {}

  @Query(() => Products)
  async getAllProduct(
    @Args('page') page: number,
    @Args('limit') limit: number,
  ) {
    return this.productService.getAllProducts(page, limit);
  }

  @UseGuards(UserRolesGuard)
  @Roles(['ADMIN'])
  @Mutation(() => Product)
  async createProduct(
    @Args('createProduct') createProduct: CreateProductDto,
    @Args('uploadImage') uploadImage: UploadImageDto,
  ) {
    return this.productService.createProduct(createProduct, uploadImage);
  }

  @Query(() => Product)
  async getProductById(@Args('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Query(() => Product)
  async getProductByName(@Args('name') name: string) {
    return this.productService.getProductByName(name);
  }

  @Query(() => [Product])
  async getProductByCategory(@Args('category') category: string) {
    return this.productService.getProductByCategory(category);
  }

  @Query(() => [Product])
  async searchProduct(@Args('name') name: string) {
    return this.productService.searchProduct(name);
  }

  @UseGuards(UserRolesGuard)
  @Roles(['ADMIN'])
  @Mutation(() => Product)
  async updateProduct(
    @Args('updateProductDto') updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(updateProductDto);
  }
}
