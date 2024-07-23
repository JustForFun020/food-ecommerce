import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Invoice } from '../../common/entity/invoiceEntity/invoice.entity';
import { CreateInvoiceDto } from '../../common/dto/invoiceDto/create-invoice.dto';
import { Product } from 'src/common/entity/productEntity/product.entity';
import { User } from 'src/common/entity/userEntity/user.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    const { userId, pid } = createInvoiceDto;
    const listProducts = await Promise.all(
      pid.map(async (id) => {
        const product = await this.productRepository.findOne({
          where: { id },
          relations: ['images'],
        });
        return product;
      }),
    );
    const currentUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    const invoice = new Invoice({
      ...createInvoiceDto,
      products: listProducts,
      user: currentUser,
    });
    await this.invoiceRepository.save(invoice);
    return invoice;
  }

  async getAllInvoice() {
    return await this.invoiceRepository.find({
      relations: ['user', 'products', 'products.images'],
    });
  }

  async toggleStatusInvoice(id: number) {
    const invoice = await this.invoiceRepository.findOne({ where: { id } });
    const currentStatus =
      invoice.status === 'Pending' ? 'Confirmed' : 'Pending';
    await this.invoiceRepository.update(invoice.id, { status: currentStatus });
    return invoice;
  }

  async deleteInvoice(id: number) {
    const invoice = await this.invoiceRepository.findOne({ where: { id } });
    try {
      await this.invoiceRepository.delete(invoice);
      return 'Delete invoice successfully';
    } catch (error) {
      return error.message;
    }
  }
}
