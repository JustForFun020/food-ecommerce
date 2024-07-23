import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InvoiceResolver } from './invoice.resolver';
import { InvoiceService } from './invoice.service';
import { Invoice } from '../../common/entity/invoiceEntity/invoice.entity';
import { Product } from 'src/common/entity/productEntity/product.entity';
import { User } from 'src/common/entity/userEntity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, User, Product])],
  providers: [InvoiceResolver, InvoiceService],
})
export class InvoiceModule {}
