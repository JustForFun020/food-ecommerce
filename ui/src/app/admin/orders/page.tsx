import dynamic from 'next/dynamic';
import React from 'react';

const AdminRootLayout = dynamic(() => import('@/layout/AdminLayout'), { ssr: false });

const AdminOrderPage = () => {
  return (
    <AdminRootLayout>
      <div>AdminOrderPage</div>;
    </AdminRootLayout>
  );
};

export default AdminOrderPage;
