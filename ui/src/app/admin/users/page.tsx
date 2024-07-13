import dynamic from 'next/dynamic';
import React from 'react';

const AdminRootLayout = dynamic(() => import('@/layout/AdminLayout'), { ssr: false });

const AdminUserPage = () => {
  return (
    <AdminRootLayout>
      <div className='flex items-center justify-center h-screen'>
        <div className='text-2xl font-bold'>Admin User Page</div>
      </div>
    </AdminRootLayout>
  );
};

export default AdminUserPage;
