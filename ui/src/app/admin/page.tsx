'use client';

import AdminHome from '@/components/Admin/Home';
import dynamic from 'next/dynamic';
import React from 'react';

const AdminRootLayout = dynamic(() => import('@/layout/AdminLayout'), { ssr: false });

const AdminPage = () => {
  return (
    <AdminRootLayout>
      <AdminHome />
    </AdminRootLayout>
  );
};

export default AdminPage;
