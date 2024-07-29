import dynamic from 'next/dynamic';
import React from 'react';

const PaymentSuccess = dynamic(() => import('@/components/Order/PaymentSuccess'), { ssr: false });

const PaymentSuccessPage = () => {
  return <PaymentSuccess />;
};

export default PaymentSuccessPage;
