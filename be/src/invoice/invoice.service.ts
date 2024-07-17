import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entity/invoice.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    const { userId } = createInvoiceDto;
    const currentUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    const invoice = new Invoice({
      ...createInvoiceDto,
      user: currentUser,
    });
    await this.invoiceRepository.save(invoice);
    return invoice;
  }
}
