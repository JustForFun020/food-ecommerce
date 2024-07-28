import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InvoiceResolver } from './invoice.resolver';
import { InvoiceService } from './invoice.service';
import { Invoice } from '../../common/entity/invoiceEntity/invoice.entity';
import { Product } from 'src/common/entity/productEntity/product.entity';
import { User } from 'src/common/entity/userEntity/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema, Payment } from 'src/common/schema/payment.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice, User, Product]),
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  providers: [InvoiceResolver, InvoiceService],
})
export class InvoiceModule {}
