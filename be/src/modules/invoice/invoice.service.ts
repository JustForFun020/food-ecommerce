import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Invoice } from '../../common/entity/invoiceEntity/invoice.entity';
import { CreateInvoiceDto } from '../../common/dto/invoiceDto/create-invoice.dto';
import { Product } from 'src/common/entity/productEntity/product.entity';
import { User } from 'src/common/entity/userEntity/user.entity';
import { CreatePaymentDto } from 'src/common/dto/invoiceDto/create-payment.dto';
import { Payment } from 'src/common/schema/payment.schema';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<Payment>,
  ) {}

  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
  });

  async createPaymentIntent(amount: number) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    return paymentIntent.client_secret;
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    try {
      const { clientSecret } = createPaymentDto;
      const paymentIntentId = clientSecret.split('_secret_')[0];
      const paymentIntent =
        await this.stripe.paymentIntents.retrieve(paymentIntentId);
      const payment = await this.paymentModel.create({
        ...createPaymentDto,
        paymentId: paymentIntent.id,
      });
      await payment.save();
      return 'Payment success';
    } catch (error) {
      throw new HttpException(error?.message ?? 'Something went wrong', 400);
    }
  }

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
