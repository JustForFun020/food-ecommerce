import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Cart } from 'src/cart/entity/cart.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entity/product.entity';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['carts', 'invoices'],
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
    const user = await this.userRepository.findOne({
      where: { username },
    });
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
      relations: [
        'carts',
        'carts.cartProducts',
        'rates',
        'carts.invoice',
        'roles',
      ],
    });
    return users;
  }
}
