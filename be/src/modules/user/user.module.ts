import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from '../../common/entity/userEntity/user.entity';
import { Cart } from 'src/common/entity/cartEntity/cart.entity';
import { Product } from 'src/common/entity/productEntity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, Product])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
