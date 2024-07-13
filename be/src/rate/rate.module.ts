import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './entity/rate.entity';
import { RateResolver } from './rate.resolver';
import { RateService } from './rate.service';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rate, Product, User])],
  providers: [RateResolver, RateService],
})
export class RateModule {}
