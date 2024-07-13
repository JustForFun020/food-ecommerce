import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Cart } from 'src/cart/entity/cart.entity';
import { Product } from 'src/product/entity/product.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, Product])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
