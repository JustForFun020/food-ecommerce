import dynamic from 'next/dynamic';
import React from 'react';

const Categories = dynamic(() => import('@/components/Categories/Categories'), { ssr: false });

const CategoriesPage = () => {
  return <Categories />;
};

export default CategoriesPage;
