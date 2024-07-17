import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entity/invoice.entity';
import { User } from 'src/user/entity/user.entity';
import { InvoiceResolver } from './invoice.resolver';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, User])],
  providers: [InvoiceResolver, InvoiceService],
})
export class InvoiceModule {}
