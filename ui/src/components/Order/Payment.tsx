'use client';

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import type { StripeElementsOptions } from '@stripe/stripe-js';
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import Checkout from './Checkout';
import { Button, Image } from 'antd';
import { BackwardOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/lib/hook/useAppSelector';
import { convertToSubCurrency } from '@/utils/convertToSubCurrency';
import { Currency } from '@/utils/enum/payment';

const stripePromise = loadStripe(process.env.NEXT_STRIPE_PUBLIC_KEY as string);

const stripeElementOptions: StripeElementsOptions = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
  locale: 'auto',
  mode: 'payment',
  currency: Currency.USD,
  appearance: {
    theme: 'stripe',
  },
};

const Payment: React.FC = () => {
  const route = useRouter();
  const searchParams = useSearchParams();

  const cartSelected = useAppSelector((state) => state.cartReducer.cartProducts);
  const totalPrice = searchParams.get('price');

  return (
    <main className='p-4 flex items-center justify-center min-h-screen gap-6 relative'>
      <Button icon={<BackwardOutlined />} className='absolute top-5 right-10' onClick={() => route.back()} />
      <div className='w-1/2'>
        <h1 className='text-4xl tracking-wide font-medium text-center'>Products</h1>
        <p className='text-center'>Check items in your cart and proceed to payment.</p>
        {cartSelected?.map((cart, index) => {
          return (
            <div key={index} className='flex items-center justify-between p-4 border rounded-md border-slate-200 mt-4'>
              <Image src={cart.product.images[0].imageUrl} width={120} alt={cart.product.name} />
              <h1 className='text-lg'>{cart.product.name}</h1>
              <h1 className='text-lg'>${cart.product.price}</h1>
              <h1 className='text-lg'>{cart.quantity}</h1>
            </div>
          );
        })}
        <div className=' mt-4 text-right'>
          <span className='text-lg font-medium opacity-50'>
            Payment: <span className='opacity-100'>$ {totalPrice}</span>
          </span>
        </div>
      </div>
      <div className='w-1/2'>
        <Elements
          stripe={stripePromise}
          options={{
            ...stripeElementOptions,
            amount: convertToSubCurrency(Number(totalPrice)),
          }}
        >
          <Checkout amount={Number(totalPrice)} />
        </Elements>
      </div>
    </main>
  );
};

export default Payment;
