import dynamic from 'next/dynamic';
import React from 'react';

const AdminAddProduct = dynamic(() => import('@/components/Admin/Product/AddProduct'));
const AdminRootLayout = dynamic(() => import('@/layout/AdminLayout'));

const AdminAddProductPage = () => {
  return (
    <AdminRootLayout>
      <AdminAddProduct />
    </AdminRootLayout>
  );
};

export default AdminAddProductPage;
