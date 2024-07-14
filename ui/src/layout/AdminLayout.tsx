'use client';

import AdminMenu from '@/components/Admin/Menu';
import { Layout } from 'antd';
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout hasSider className='h-screen'>
      <AdminMenu />
      <Layout>
        <Layout.Content className='overflow-auto'>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
