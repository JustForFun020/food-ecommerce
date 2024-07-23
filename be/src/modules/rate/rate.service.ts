import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rate } from '../../common/entity/rateEntity/rate.entity';
import { Product } from 'src/common/entity/productEntity/product.entity';
import { User } from 'src/common/entity/userEntity/user.entity';
import { CreateRateDto } from '../../common/dto/rateDto/create-rate.dto';
import { UpdateRateDto } from '../../common/dto/rateDto/update-rate.dto';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createRate(createRate: CreateRateDto) {
    const { name, uid } = createRate;
    const productExists = await this.productRepository.findOne({
      where: { name },
    });
    const currentUser = await this.userRepository.findOne({
      where: { id: uid },
    });
    if (!productExists) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    try {
      const rate = new Rate({
        ...createRate,
        product: productExists,
        user: currentUser,
      });
      await this.rateRepository.save(rate);
      return rate;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateRate(updateRateDto: UpdateRateDto) {
    const { user, product } = updateRateDto;
    const { name } = product;
    const productExists = await this.productRepository.findOne({
      where: { name },
    });
    const currentUser = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (!productExists) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    try {
      const rate = new Rate({
        ...updateRateDto,
        product: productExists,
        user: currentUser,
      });
      await this.rateRepository.update(rate.id, rate);
      return rate;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteRate(id: number) {
    const rate = await this.rateRepository.findOne({
      where: { id },
    });

    if (!rate) {
      throw new HttpException('Rate not found', HttpStatus.NOT_FOUND);
    }

    try {
      await this.rateRepository.delete(id);
      return rate;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRateByProduct(productName: string) {
    const product = await this.productRepository.findOne({
      where: { name: productName },
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    try {
      return await this.rateRepository.find({
        where: { product },
        relations: ['user', 'product'],
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
