import dynamic from 'next/dynamic';
import React from 'react';

const AdminRootLayout = dynamic(() => import('@/layout/AdminLayout'));

const ProductIdPage = ({ params }: { params: { pid: number } }) => {
  const { pid } = params;
  return (
    <AdminRootLayout>
      <div>ProductIdPage {pid}</div>;
    </AdminRootLayout>
  );
};

export default ProductIdPage;
