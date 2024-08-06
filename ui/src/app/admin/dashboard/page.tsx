import dynamic from 'next/dynamic';
import React from 'react';

const AdminRootLayout = dynamic(() => import('@/layout/AdminLayout'), { ssr: false });
const AdminReport = dynamic(() => import('@/components/Admin/Report/Report'), { ssr: false });

const AdminDashBoardPage = () => {
  return (
    <AdminRootLayout>
      <AdminReport />
    </AdminRootLayout>
  );
};

export default AdminDashBoardPage;
