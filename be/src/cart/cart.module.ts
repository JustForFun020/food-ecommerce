import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';
import { Invoice } from '../invoice/entity/invoice.entity';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';
import { CartProducts } from './entity/cart-products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Invoice, Product, User, CartProducts]),
  ],
  providers: [CartResolver, CartService],
})
export class CartModule {}
