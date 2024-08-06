import dynamic from 'next/dynamic';
import React from 'react';

const Payment = dynamic(() => import('@/components/Order/Payment'), { ssr: false });

const PaymentPage = ({
  searchParams,
}: {
  searchParams: {
    price: number;
  };
}) => {
  return <Payment />;
};

export default PaymentPage;
