'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Result, Space, Steps, Tooltip } from 'antd';
import type { StepsProps } from 'antd';
import Header from '../Header';
import { useCustomRouter } from '@/lib/hook/useCustomRouter';
import { useQuery } from '@apollo/client';

const stepItem: StepsProps['items'] = [
  {
    title: (
      <Tooltip
        className='cursor-default'
        title='Your payment has been successfully processed and received. 
        You can now expect your order to be confirmed and prepared for dispatch. 
        If you have any questions or need to review your payment details, please visit your 
        account section or contact our support team.'
      >
        Payment Success
      </Tooltip>
    ),
    description: 'Your payment was successful',
  },
  {
    title: (
      <Tooltip
        className='cursor-default'
        title='We are currently processing your order. 
        This step involves verifying the items, packaging them securely, and preparing them for shipment. 
        Please allow some time for us to complete this process. 
        You will receive an update once your order is ready to be shipped.'
      >
        Processing Order
      </Tooltip>
    ),
    description: 'Your order is being processed',
  },
  {
    title: (
      <Tooltip
        className='cursor-default'
        title='Your order has been completed and is on its way to you. 
        This means that your items have been packaged and handed over to the shipping carrier. 
        You can track your shipment using the tracking number provided in your order confirmation email. 
        Thank you for shopping with us!'
      >
        Order Complete
      </Tooltip>
    ),
    description: 'Your order is complete',
  },
];

const PaymentSuccess: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const { navigateTo } = useCustomRouter();

  const searchParams = useSearchParams();
  const pricePayment = searchParams.get('price');
  const invoiceId = searchParams.get('invoiceId');

  return (
    <main>
      <header className='h-24 bg-slate-900 pt-4 pb-4 pl-10 pr-10 text-white'>
        <Header />
      </header>
      <Result
        status='success'
        title={
          <div>
            <h1>Payment Received - Order Awaiting Confirmation</h1>
            <p>Price: $ {pricePayment}</p>
          </div>
        }
        subTitle={
          <div>
            <p>{`Thank you for your payment. We've successfully received your funds. Your order is now pending admin review and confirmation. We'll notify you once it's been approved.`}</p>
          </div>
        }
        extra={
          <Space direction='vertical' className='w-2/3' size='large'>
            <div className='mb-6'>
              <Steps items={stepItem} current={currentStep} />
            </div>
            <div className='*:w-[160px]'>
              <Button className='mr-5' onClick={() => navigateTo('/')}>
                Back To Home!
              </Button>
              <Button type='primary' onClick={() => navigateTo('/explore')}>
                Continues Shopping
              </Button>
            </div>
            <h1 className='mt-5 text-4xl font-medium tracking-wide opacity-75'>Thanks for shopping with us!</h1>
          </Space>
        }
      />
    </main>
  );
};

export default PaymentSuccess;
