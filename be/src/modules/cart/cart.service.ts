import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from '../../common/entity/cartEntity/cart.entity';
import { CartProducts } from '../../common/entity/cartEntity/cart-products.entity';
import { Product } from 'src/common/entity/productEntity/product.entity';
import { User } from 'src/common/entity/userEntity/user.entity';
import { CreateCartDto } from '../../common/dto/cartDto/create-cart.dto';
import { CreateCartProductsDto } from '../../common/dto/cartDto/create-cart-products.dto';
import { UpdateCartDto } from 'src/common/dto/cartDto/update-cart.dto';

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

  private async findOrCreateDefaultCart(uid: number): Promise<Cart> {
    const defaultCart = await this.cartRepository.findOne({
      where: { user: { id: uid }, name: 'Default Cart' },
    });

    if (defaultCart) return defaultCart;

    const currentUser = await this.userRepository.findOneOrFail({
      where: { id: uid },
    });
    return this.cartRepository.save(
      new Cart({
        name: 'Default Cart',
        description: 'This is Default cart',
        topic: 'Default',
        user: currentUser,
      }),
    );
  }

  async isProductInCart(pid: number, cid: number): Promise<boolean> {
    const cartProduct = await this.cartProductsRepository.findOne({
      where: { cart: { id: cid }, product: { id: pid } },
    });
    return !!cartProduct;
  }

  async createCart(createCartDto: CreateCartDto): Promise<CartProducts[]> {
    const { pid, name, description, topic, uid } = createCartDto;

    await this.ensureUniqueCartName(name);
    const products = await this.getProductsByIds(pid);
    const currentUser = await this.userRepository.findOneOrFail({
      where: { id: uid },
    });

    const cart = await this.cartRepository.save(
      new Cart({ name, description, topic, user: currentUser }),
    );

    const cartProducts = products.map(
      (product) => new CartProducts({ cart, product, quantity: 1 }),
    );

    return this.cartProductsRepository.save(cartProducts);
  }

  private async ensureUniqueCartName(name: string): Promise<void> {
    const existingCart = await this.cartRepository.findOne({ where: { name } });
    if (existingCart) {
      throw new HttpException(
        'Cart name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async getProductsByIds(ids: number[]): Promise<Product[]> {
    return Promise.all(
      ids.map((id) => this.productRepository.findOneOrFail({ where: { id } })),
    );
  }

  async addProductToCart(
    createCartProductDto: CreateCartProductsDto,
  ): Promise<CartProducts> {
    const { pid, cid, quantity, uid } = createCartProductDto;
    const product = await this.productRepository.findOneOrFail({
      where: { id: pid },
      relations: ['images'],
    });

    const cart =
      cid === 0
        ? await this.findOrCreateDefaultCart(uid)
        : await this.cartRepository.findOneOrFail({ where: { id: cid } });

    if (await this.isProductInCart(pid, cart.id)) {
      throw new HttpException(
        'Product is already in cart',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.cartProductsRepository.save(
      new CartProducts({ product, cart, quantity }),
    );
  }

  async getAllUserCart(uid: number): Promise<Cart[]> {
    const carts = await this.cartRepository.find({
      where: { user: { id: uid } },
      relations: ['cartProducts.product', 'cartProducts.product.images'],
    });
    return carts.length === 1 && carts[0].cartProducts.length === 0
      ? []
      : carts;
  }

  async getCartById(cid: number): Promise<Cart> {
    return this.cartRepository.findOneOrFail({
      where: { id: cid },
      relations: ['cartProducts'],
    });
  }

  async deleteCartById(cid: number): Promise<string> {
    const cart = await this.cartRepository.findOne({ where: { id: cid } });
    if (!cart) return 'Cart not found';

    await this.cartProductsRepository.delete({ cart });
    await this.cartRepository.delete({ id: cid });
    return 'Cart deleted';
  }

  async deleteProductFromCart(pid: number, cid: number): Promise<string> {
    const cartProduct = await this.cartProductsRepository.findOne({
      where: { cart: { id: cid }, product: { id: pid } },
    });
    if (!cartProduct) return 'Product not found';

    await this.cartProductsRepository.delete({ id: cartProduct.id });
    return 'Product deleted';
  }

  async updateCart(updateCartDto: UpdateCartDto): Promise<Cart> {
    const { uid, cartProducts, cid, name, description, topic } = updateCartDto;
    const cart = await this.cartRepository.findOneOrFail({
      where: { user: { id: uid }, id: cid },
    });

    await this.updateCartProducts(cid, cartProducts);

    const updatedCart = { ...cart, name, description, topic };
    await this.cartRepository.update({ id: cid }, updatedCart);
    return updatedCart;
  }

  private async updateCartProducts(
    cid: number,
    cartProducts: { pid: number; quantity: number }[],
  ): Promise<void> {
    await Promise.all(
      cartProducts.map(({ pid, quantity }) =>
        this.cartProductsRepository.update(
          { cart: { id: cid }, product: { id: pid } },
          { quantity },
        ),
      ),
    );
  }
}
