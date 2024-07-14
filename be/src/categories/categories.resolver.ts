import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Public } from 'src/auth/decorator/isPublic.decorator';
import { Categories } from './entity/categories.entity';

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
}
