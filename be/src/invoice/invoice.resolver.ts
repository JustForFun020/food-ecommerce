import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { UserRolesGuard } from 'src/user/guard/user-roles.guard';
import { Roles } from 'src/user/decorator/role.decorator';
import { Invoice } from './entity/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { CreateInvoiceInterceptor } from './interceptor/create-invoice.interceptor';
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
}
