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
      relations: ['carts'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...res } = user;
    return res;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const { email } = updateUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
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
}
