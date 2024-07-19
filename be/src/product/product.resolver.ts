import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entity/product.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from 'src/user/decorator/role.decorator';
import { UserRolesGuard } from 'src/user/guard/user-roles.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UploadImageDto } from './dto/upload-image.dto';
import { Public } from 'src/auth/decorator/isPublic.decorator';
import { Products } from './model/products.model';

@Resolver()
export class ProductResolver {
  constructor(
    @Inject(ProductService)
    private readonly productService: ProductService,
  ) {}

  @Public()
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

  @Public()
  @Query(() => Product)
  async getProductById(@Args('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Public()
  @Query(() => Product)
  async getProductByName(@Args('name') name: string) {
    return this.productService.getProductByName(name);
  }

  @Public()
  @Query(() => [Product])
  async getProductByCategory(@Args('category') category: string) {
    return this.productService.getProductByCategory(category);
  }

  @Public()
  @Query(() => [Product])
  async searchProduct(@Args('name') name: string) {
    return this.productService.searchProduct(name);
  }
}
