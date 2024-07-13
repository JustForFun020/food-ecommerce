import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { Rate } from './entity/rate.entity';
import { Roles } from 'src/user/decorator/role.decorator';
import { UserRolesGuard } from 'src/user/guard/user-roles.guard';

@Resolver()
export class RateResolver {
  constructor(
    @Inject(RateService)
    private readonly rateService: RateService,
  ) {}

  @UseGuards(UserRolesGuard)
  @Roles(['ADMIN', 'USER'])
  @Mutation(() => Rate)
  async createRate(@Args('createRateDto') createRateDto: CreateRateDto) {
    return this.rateService.createRate(createRateDto);
  }

  @UseGuards(UserRolesGuard)
  @Roles(['ADMIN', 'USER'])
  @Query(() => [Rate])
  async getRateByProduct(@Args('productName') productName: string) {
    return this.rateService.getRateByProduct(productName);
  }
}
