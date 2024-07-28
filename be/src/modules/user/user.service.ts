import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../common/entity/userEntity/user.entity';
import { Cart } from 'src/common/entity/cartEntity/cart.entity';
import { Product } from 'src/common/entity/productEntity/product.entity';
import { UpdateUserDto } from '../../common/dto/userDto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  private readonly userRelation = [
    'carts',
    'invoices',
    'invoices.products',
    'invoices.products.images',
  ];

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: this.userRelation,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...res } = user;
    return res;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const { username } = updateUserDto;
    const user = await this.getUserByUsername(username);
    const newUser = new User({
      ...user,
      email: updateUserDto.email,
      address: updateUserDto.address,
      phone: updateUserDto.phone,
    });
    await this.userRepository.save(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...res } = newUser;
    return res;
  }

  async getAllUser() {
    const users = await this.userRepository.find({
      where: {
        roles: {
          name: 'USER',
        },
      },
      relations: ['carts.cartProducts', 'rates', 'roles', ...this.userRelation],
    });
    return users;
  }
}
