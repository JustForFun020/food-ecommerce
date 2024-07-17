import { Inject, UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { UserRolesGuard } from 'src/user/guard/user-roles.guard';
import { Roles } from 'src/user/decorator/role.decorator';
import { CartProducts } from './entity/cart-products.entity';
import { CreateCartProductsDto } from './dto/create-cart-products.dto';
import { Cart } from './entity/cart.entity';
import { UpdateBasicInformationCartDto } from './dto/update-info-cart.dto';
import { UpdateCartProductQuantityDto } from './dto/update-cart-product-quantity.dto';
import { Invoice } from './entity/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { CreateInvoiceExceptionFilter } from './filter/create-invoice.filter';

@Resolver()
export class CartResolver {
  constructor(
    @Inject(CartService)
    private readonly cartService: CartService,
  ) {}

  @UseGuards(UserRolesGuard)
  @Roles(['USER'])
  @Mutation(() => CartProducts)
  async addProductToCart(
    @Args('addProductDto') addProductDto: CreateCartProductsDto,
  ) {
    return await this.cartService.addProductToCart(addProductDto);
  }

  @UseGuards(UserRolesGuard)
  @Roles(['USER', 'ADMIN'])
  @Query(() => [Cart])
  async getAllUserCarts(@Args('uid') uid: number) {
    return await this.cartService.getAllUserCart(uid);
  }

  @UseGuards(UserRolesGuard)
  @Roles(['USER', 'ADMIN'])
  @Mutation(() => String)
  async deleteCart(@Args('cid') cid: number) {
    return await this.cartService.deleteCartById(cid);
  }

  @UseGuards(UserRolesGuard)
  @Roles(['USER'])
  @Mutation(() => Cart)
  async updateBasicInfoCart(
    @Args('updateBasicInfoCartDto')
    updateBasicInfoCartDto: UpdateBasicInformationCartDto,
  ) {
    return await this.cartService.updateBasicInformationCart(
      updateBasicInfoCartDto,
    );
  }

  @UseGuards(UserRolesGuard)
  @Roles(['USER'])
  @Mutation(() => String)
  async updateCartProductQuantity(
    @Args('updateCartProductQuantityDto', {
      type: () => [UpdateCartProductQuantityDto],
    })
    updateCartProductQuantityDto: UpdateCartProductQuantityDto[],
  ) {
    return await this.cartService.updateCartProductQuantity(
      updateCartProductQuantityDto,
    );
  }

  @UseGuards(UserRolesGuard)
  @Roles(['USER'])
  @Mutation(() => String)
  async deleteProductFromCart(
    @Args('pid') pid: number,
    @Args('cid') cid: number,
  ) {
    return await this.cartService.deleteProductFromCart(pid, cid);
  }

  @UseFilters(CreateInvoiceExceptionFilter)
  @UseGuards(UserRolesGuard)
  @Roles(['USER'])
  @Mutation(() => Invoice)
  async createInvoice(
    @Args('createInvoiceDto') createInvoiceDto: CreateInvoiceDto,
  ) {
    return await this.cartService.createInvoice(createInvoiceDto);
  }
}
