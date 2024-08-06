import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CartService } from './cart.service';
import { Roles } from 'src/common/decorator/role.decorator';
import { UserRolesGuard } from 'src/common/guard/user-roles.guard';
import { CartProducts } from '../../common/entity/cartEntity/cart-products.entity';
import { Cart } from '../../common/entity/cartEntity/cart.entity';
import { CreateCartProductsDto } from '../../common/dto/cartDto/create-cart-products.dto';
import { UpdateCartDto } from 'src/common/dto/cartDto/update-cart.dto';
import { CreateCartDto } from 'src/common/dto/cartDto/create-cart.dto';

@UseGuards(UserRolesGuard)
@Roles(['USER'])
@Resolver()
export class CartResolver {
  constructor(
    @Inject(CartService)
    private readonly cartService: CartService,
  ) {}

  @Mutation(() => CartProducts)
  async addProductToCart(
    @Args('addProductDto') addProductDto: CreateCartProductsDto,
  ) {
    return await this.cartService.addProductToCart(addProductDto);
  }

  @Roles(['ADMIN'])
  @Query(() => [Cart])
  async getAllUserCarts(@Args('uid') uid: number) {
    return await this.cartService.getAllUserCart(uid);
  }

  @Roles(['ADMIN'])
  @Mutation(() => String)
  async deleteCart(@Args('cid') cid: number) {
    return await this.cartService.deleteCartById(cid);
  }

  @Mutation(() => String)
  async deleteProductFromCart(
    @Args('pid') pid: number,
    @Args('cid') cid: number,
  ) {
    return await this.cartService.deleteProductFromCart(pid, cid);
  }

  @Mutation(() => Cart)
  async updateCart(@Args('updateCartDto') updateCartDto: UpdateCartDto) {
    return await this.cartService.updateCart(updateCartDto);
  }

  @Mutation(() => [CartProducts])
  async createCart(@Args('createCartDto') createCartDto: CreateCartDto) {
    return await this.cartService.createCart(createCartDto);
  }
}
