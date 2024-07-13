import dynamic from 'next/dynamic';
import React from 'react';

const AdminRootLayout = dynamic(() => import('@/layout/AdminLayout'), { ssr: false });

const AdminDashBoardPage = () => {
  return (
    <AdminRootLayout>
      <div>AdminDashBoardPage</div>;
    </AdminRootLayout>
  );
};

export default AdminDashBoardPage;
