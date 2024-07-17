import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Public } from 'src/auth/decorator/isPublic.decorator';
import { Categories } from './entity/categories.entity';
import { UserRolesGuard } from 'src/user/guard/user-roles.guard';
import { Roles } from 'src/user/decorator/role.decorator';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

  @UseGuards(UserRolesGuard)
  @Roles(['ADMIN'])
  @Mutation(() => String)
  async deleteCategory(@Args('id') id: number) {
    return await this.categoriesService.deleteCategory(id);
  }

  @UseGuards(UserRolesGuard)
  @Roles(['ADMIN'])
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

  @UseGuards(UserRolesGuard)
  @Roles(['ADMIN'])
  @Mutation(() => Categories)
  async updateCategory(
    @Args('updateCategoryDto') updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.updateCategory(updateCategoryDto);
  }
}
