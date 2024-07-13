import dynamic from 'next/dynamic';
import React from 'react';

const Category = dynamic(() => import('@/components/Categories/Category'), { ssr: false });

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const { category } = params;
  return <Category category={category} />;
};

export default CategoryPage;
