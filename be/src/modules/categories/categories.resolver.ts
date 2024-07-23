import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CategoriesService } from './categories.service';
import { Public } from 'src/common/decorator/isPublic.decorator';
import { Roles } from 'src/common/decorator/role.decorator';
import { UserRolesGuard } from 'src/common/guard/user-roles.guard';
import { Categories } from '../../common/entity/categoriesEntity/categories.entity';
import { UpdateCategoryDto } from '../../common/dto/categoriesDto/update-category.dto';

@UseGuards(UserRolesGuard)
@Roles(['ADMIN'])
@Resolver()
export class CategoriesResolver {
  constructor(
    @Inject(CategoriesService)
    private readonly categoriesService: CategoriesService,
  ) {}

  @Public()
  @Query(() => [Categories])
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  @Public()
  @Query(() => Categories)
  async getCategoryByName(@Args('name') name: string) {
    return await this.categoriesService.getCategoryByName(name);
  }

  @Mutation(() => String)
  async deleteCategory(@Args('id') id: number) {
    return await this.categoriesService.deleteCategory(id);
  }

  @Mutation(() => Categories)
  async deleteProductFromCategory(
    @Args('categoryId') categoryId: number,
    @Args('productId') productId: number,
  ) {
    return await this.categoriesService.deleteProductFromCategory(
      categoryId,
      productId,
    );
  }

  @Mutation(() => Categories)
  async updateCategory(
    @Args('updateCategoryDto') updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.updateCategory(updateCategoryDto);
  }
}
