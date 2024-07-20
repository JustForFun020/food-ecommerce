import dynamic from 'next/dynamic';
import React from 'react';

const AdminRootLayout = dynamic(() => import('@/layout/AdminLayout'), { ssr: false });
const AdminCategories = dynamic(() => import('@/components/Admin/Categories/Categories'), { ssr: false });

const AdminCategoriesPage = () => {
  return (
    <AdminRootLayout>
      <AdminCategories />
    </AdminRootLayout>
  );
};

export default AdminCategoriesPage;
