import dynamic from 'next/dynamic';
import React from 'react';

const ProductInformation = dynamic(() => import('@/components/Product/ProductInformation'), { ssr: false });

const ProductInformationPage = ({ params }: { params: { name: string } }) => {
  const { name } = params;
  const validName = decodeURIComponent(name);

  return <ProductInformation name={validName} />;
};

export default ProductInformationPage;
