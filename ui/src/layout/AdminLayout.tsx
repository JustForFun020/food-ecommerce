'use client';

import AdminMenu from '@/components/Admin/Menu';
import UnAuthorization from '@/components/Error/403';
import { useAuththor } from '@/lib/hook/useAuththor';
import { Layout } from 'antd';
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useAuththor();

  // if (!isAdmin) {
  //   return <UnAuthorization />;
  // }

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
