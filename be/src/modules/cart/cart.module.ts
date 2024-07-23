import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';
import { Cart } from '../../common/entity/cartEntity/cart.entity';
import { Invoice } from '../../common/entity/invoiceEntity/invoice.entity';
import { CartProducts } from '../../common/entity/cartEntity/cart-products.entity';
import { Product } from 'src/common/entity/productEntity/product.entity';
import { User } from 'src/common/entity/userEntity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Invoice, Product, User, CartProducts]),
  ],
  providers: [CartResolver, CartService],
})
export class CartModule {}
