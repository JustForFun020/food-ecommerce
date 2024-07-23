import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RateService } from './rate.service';
import { RateResolver } from './rate.resolver';
import { Rate } from '../../common/entity/rateEntity/rate.entity';
import { Product } from 'src/common/entity/productEntity/product.entity';
import { User } from 'src/common/entity/userEntity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rate, Product, User])],
  providers: [RateResolver, RateService],
})
export class RateModule {}
