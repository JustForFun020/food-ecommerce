import dynamic from 'next/dynamic';
import React from 'react';

const Rate = dynamic(() => import('@/components/Product/Rate'), { ssr: false });

const RatePage = ({
  params,
}: {
  params: {
    name: string;
  };
}) => {
  const { name } = params;
  const validName = decodeURIComponent(name);
  return <Rate name={validName} />;
};

export default RatePage;
