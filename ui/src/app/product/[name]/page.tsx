import dynamic from 'next/dynamic';
import React from 'react';

const Product = dynamic(() => import('@/components/Product/Product'), { ssr: false });

const ProductPage = ({ params }: { params: { name: string } }) => {
  const { name } = params;
  const validName = decodeURIComponent(name);
  return <Product />;
};

export default ProductPage;
