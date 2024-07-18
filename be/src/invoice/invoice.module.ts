import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entity/invoice.entity';
import { User } from 'src/user/entity/user.entity';
import { InvoiceResolver } from './invoice.resolver';
import { InvoiceService } from './invoice.service';
import { Product } from 'src/product/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, User, Product])],
  providers: [InvoiceResolver, InvoiceService],
})
export class InvoiceModule {}
