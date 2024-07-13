import dynamic from 'next/dynamic';
import React from 'react';

const Order = dynamic(() => import('../../components/Order/Order'), { ssr: false });

const OrderPage = () => {
  return <Order />;
};

export default OrderPage;
