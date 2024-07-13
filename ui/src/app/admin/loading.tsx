import dynamic from 'next/dynamic';
import React from 'react';

const AdminRootLayout = dynamic(() => import('@/layout/AdminLayout'), { loading: () => <p>Loading...</p>, ssr: false });

const AdminLoading = () => {
  return (
    <AdminRootLayout>
      <div>Loading...</div>
    </AdminRootLayout>
  );
};

export default AdminLoading;
