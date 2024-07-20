import dynamic from 'next/dynamic';
import React from 'react';

const AdminRootLayout = dynamic(() => import('@/layout/AdminLayout'), { ssr: false });
const AdminOrder = dynamic(() => import('@/components/Admin/Order/Orders'), { ssr: false });

const AdminOrderPage = () => {
  return (
    <AdminRootLayout>
      <AdminOrder />
    </AdminRootLayout>
  );
};

export default AdminOrderPage;
