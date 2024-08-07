import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards, UseInterceptors } from '@nestjs/common';

import { InvoiceService } from './invoice.service';
import { UserRolesGuard } from 'src/common/guard/user-roles.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { CreateInvoiceInterceptor } from '../../common/interceptor/create-invoice.interceptor';
import { Invoice } from '../../common/entity/invoiceEntity/invoice.entity';
import { CreateInvoiceDto } from '../../common/dto/invoiceDto/create-invoice.dto';
import { CreatePaymentDto } from 'src/common/dto/invoiceDto/create-payment.dto';

@UseGuards(UserRolesGuard)
@Roles(['ADMIN'])
@Resolver()
export class InvoiceResolver {
  constructor(
    @Inject(InvoiceService)
    private readonly invoiceService: InvoiceService,
  ) {}

  @UseInterceptors(CreateInvoiceInterceptor)
  @Roles(['USER'])
  @Mutation(() => Invoice)
  async createInvoice(
    @Args('createInvoiceDto') createInvoiceDto: CreateInvoiceDto,
  ) {
    return await this.invoiceService.createInvoice(createInvoiceDto);
  }

  @Query(() => [Invoice])
  async getAllInvoice() {
    return await this.invoiceService.getAllInvoice();
  }

  @Mutation(() => Invoice)
  async toggleStatusInvoice(@Args('id') id: number) {
    return await this.invoiceService.toggleStatusInvoice(id);
  }

  @Mutation(() => String)
  async deleteInvoice(@Args('id') id: number) {
    return await this.invoiceService.deleteInvoice(id);
  }

  @Roles(['USER'])
  @Mutation(() => String)
  async createPaymentIntent(@Args('amount') amount: number) {
    return await this.invoiceService.createPaymentIntent(amount);
  }

  @Roles(['USER'])
  @Mutation(() => String)
  async createPayment(
    @Args('createPaymentDto') createPaymentDto: CreatePaymentDto,
  ) {
    return await this.invoiceService.createPayment(createPaymentDto);
  }

  @Roles(['USER'])
  @Query(() => Invoice)
  async getInvoiceById(@Args('id') id: number) {
    return await this.invoiceService.getInvoiceById(id);
  }
}
