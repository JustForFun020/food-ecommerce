import _ from 'lodash';
import React, { useEffect } from 'react';
import {
  CREATE_INVOICE_MUTATION,
  CREATE_PAYMENT_INTENT_MUTATION,
  CREATE_PAYMENT_MUTATION,
} from '@/lib/graphql/mutation';
import { useAppSelector } from '@/lib/hook/useAppSelector';
import { useAuththor } from '@/lib/hook/useAuththor';
import { convertToSubCurrency } from '@/utils/convertToSubCurrency';
import { emailRules, requiredField } from '@/utils/formValidate';
import { Product } from '@/utils/types/product';
import { useMutation } from '@apollo/client';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, Form, Input, message } from 'antd';
import { Currency, PaymentMethod, StatusPayment } from '@/utils/enum/payment';
import type { StripePaymentElementOptions } from '@stripe/stripe-js';

interface CheckoutProps {
  amount: number;
}

const paymentElementOptions: StripePaymentElementOptions = {
  fields: {
    billingDetails: {
      name: 'auto',
      email: 'auto',
    },
  },
};

const Checkout: React.FC<CheckoutProps> = ({ amount }) => {
  const [clientSecret, setClientSecret] = React.useState('');

  const { currentUser } = useAuththor();

  const products = useAppSelector((state) => state.cartReducer.cartProducts);
  const listProductsCheckout = _.map(products, (p) => {
    const product = _.get(p, 'product', {} as Product);
    return {
      id: Number(product.id),
      name: product.name,
      price: product.price,
      quantity: p.quantity,
    };
  });

  const stripe = useStripe();
  const elements = useElements();

  const [form] = Form.useForm();

  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT_MUTATION, {
    onCompleted: (data) => {
      setClientSecret(data.createPaymentIntent);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
  const [createPayment] = useMutation(CREATE_PAYMENT_MUTATION);
  const [createInvoice] = useMutation(CREATE_INVOICE_MUTATION);

  useEffect(() => {
    createPaymentIntent({ variables: { amount: convertToSubCurrency(amount) } });
  }, [createPaymentIntent, amount]);

  const handlePaymentSucceeded = async (variables: any) => {
    await createPayment({
      variables: {
        createPaymentDto: variables,
      },
    });
    await createInvoice({
      variables: {
        createInvoiceDto: {
          userId: Number(currentUser?.id),
          name: 'Invoice',
          price: amount,
          pid: listProductsCheckout.map((p) => p.id),
        },
      },
    });
  };

  const handleSubmit = async (e: any) => {
    const { fullName, email } = e;
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      message.error(submitError.message ?? 'Something went wrong');
      return;
    }

    const createPaymentDto = {
      clientName: fullName,
      clientEmail: email,
      clientSecret,
      uid: Number(currentUser?.id),
      paymentId: '',
      paymentMethod: [PaymentMethod.CART],
      products: listProductsCheckout,
      status: StatusPayment.SUCCEEDED,
      amount: convertToSubCurrency(amount),
      currency: Currency.USD,
    };
    handlePaymentSucceeded(createPaymentDto);

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/order/payment-success?price=${amount}`,
        payment_method_data: {
          billing_details: {
            name: fullName,
            email,
          },
        },
      },
    });
    if (error) {
      message.error(error.message ?? 'Something went wrong');
      return;
    }
  };

  return (
    <Form
      onFinish={(e) => handleSubmit(e)}
      className='w-2/3 p-5 border rounded-md border-slate-200'
      labelAlign='left'
      labelCol={{ span: 5 }}
      form={form}
    >
      <Form.Item rules={requiredField('Full Name')} label='Full Name' name={'fullName'}>
        <Input placeholder='Full Name' />
      </Form.Item>
      <Form.Item rules={emailRules} label='Email' name='email'>
        <Input placeholder='Email' />
      </Form.Item>
      <Form.Item rules={requiredField('Cart Information')} name={'cartInformation'}>
        {clientSecret && <PaymentElement options={paymentElementOptions} />}
      </Form.Item>
      <Form.Item className='mt-4'>
        <Button htmlType='submit' type='primary' className='w-full'>
          Payment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Checkout;
