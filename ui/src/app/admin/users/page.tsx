import dynamic from 'next/dynamic';
import React from 'react';

const AdminRootLayout = dynamic(() => import('@/layout/AdminLayout'), { ssr: false });
const AdminUser = dynamic(() => import('@/components/Admin/Users'), { ssr: false });

const AdminUserPage = () => {
  return (
    <AdminRootLayout>
      <AdminUser />
    </AdminRootLayout>
  );
};

export default AdminUserPage;
