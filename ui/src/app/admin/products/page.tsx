import dynamic from 'next/dynamic';
import React from 'react';

const AdminProducts = dynamic(() => import('@/components/Admin/Products'), {
  ssr: false,
});

const AdminRootLayout = dynamic(() => import('@/layout/AdminLayout'), { ssr: false });

const AdminProductPage = () => {
  return (
    <AdminRootLayout>
      <AdminProducts />
    </AdminRootLayout>
  );
};

export default AdminProductPage;
