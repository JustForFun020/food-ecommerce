import dynamic from 'next/dynamic';
import React from 'react';

const Category = dynamic(() => import('@/components/Categories/Category'), { ssr: false });

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const { category } = params;
  const validCategory = decodeURIComponent(category);
  return <Category category={validCategory} />;
};

export default CategoryPage;
