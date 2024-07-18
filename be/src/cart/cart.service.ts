import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CartProducts } from './entity/cart-products.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { CreateCartProductsDto } from './dto/create-cart-products.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CartProducts)
    private readonly cartProductsRepository: Repository<CartProducts>,
  ) {}

  async isProductInCart(pid: number, cid: number) {
    const cart = await this.cartProductsRepository.findOne({
      where: { cart: { id: cid }, product: { id: pid } },
    });
    if (cart) {
      return true;
    }
    return false;
  }

  async createCart(createCart: CreateCartDto) {
    const { uid } = createCart;
    const currentUser = await this.userRepository.findOne({
      where: { id: uid },
    });
    const cart = new Cart({
      name: createCart.name,
      description: createCart.description,
      topic: createCart.topic,
      user: currentUser,
    });
    return await this.cartRepository.save(cart);
  }

  async addProductToCart(createCartProductDto: CreateCartProductsDto) {
    const { pid, cid, quantity } = createCartProductDto;
    const product = await this.productRepository.findOne({
      where: { id: pid },
      relations: ['images'],
    });
    let cart = await this.cartRepository.findOne({
      where: { id: cid },
    });
    const currentUser = await this.userRepository.findOne({
      where: { id: cart.user.id },
    });
    if (!cart) {
      cart = new Cart({
        name: cart.name,
        description: cart.description,
        topic: cart.topic,
        user: currentUser,
      });
      await this.cartRepository.save(cart);
    }
    const cartProduct = new CartProducts({
      product,
      cart,
      quantity,
    });
    if (await this.isProductInCart(pid, cart.id)) {
      throw new HttpException(
        'Product is already in cart',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.cartProductsRepository.save(cartProduct);
  }

  async getAllUserCart(uid: number) {
    const cart = await this.cartRepository.find({
      where: { user: { id: uid } },
      relations: ['cartProducts.product', 'cartProducts.product.images'],
    });
    if (cart.length === 1 && cart[0].cartProducts.length === 0) {
      return [];
    }
    return cart;
  }

  async getCartById(cid: number) {
    return await this.cartRepository.findOne({
      where: { id: cid },
      relations: ['cartProducts'],
    });
  }

  async deleteCartById(cid: number) {
    const cart = await this.cartRepository.findOne({
      where: { id: cid },
    });
    if (!cart) {
      return 'Cart not found';
    }
    await this.cartProductsRepository.delete({ cart });
    await this.cartRepository.delete({ id: cid });
    return 'Cart deleted';
  }

  async deleteProductFromCart(pid: number, cid: number) {
    const cartProduct = await this.cartProductsRepository.findOne({
      where: { cart: { id: cid }, product: { id: pid } },
    });
    if (!cartProduct) {
      return 'Product not found';
    }
    await this.cartProductsRepository.delete({ id: cartProduct.id });
    return 'Product deleted';
  }

  async updateCart(updateCartDto: UpdateCartDto) {
    const { uid, cartProducts, cid } = updateCartDto;
    const currentUser = await this.userRepository.findOne({
      where: { id: uid },
    });
    const cart = await this.cartRepository.findOne({
      where: { user: currentUser, id: cid },
    });
    await Promise.all(
      cartProducts.map(async (cartProduct) => {
        const { pid, quantity, cid } = cartProduct;
        const item = await this.cartProductsRepository.findOne({
          where: { cart: { id: cid }, product: { id: pid } },
        });
        const newProductCart = new CartProducts({
          ...item,
          quantity,
        });
        await this.cartProductsRepository.update(
          { cart: { id: cid }, product: { id: pid } },
          newProductCart,
        );
      }),
    );
    const newCart = new Cart({
      ...cart,
      name: updateCartDto.name,
      description: updateCartDto.description,
      topic: updateCartDto.topic,
    });
    await this.cartRepository.update({ id: cid }, newCart);
    return newCart;
  }
}
