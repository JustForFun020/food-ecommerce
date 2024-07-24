'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import { useLogout } from '@/lib/hook/useLogout';
import { useCustomRouter } from '@/lib/hook/useCustomRouter';

const menuItem: MenuProps['items'] = [
  {
    label: 'Home',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: <PieChartOutlined />,
  },
  {
    label: 'Users',
    key: 'users',
    icon: <UserOutlined />,
  },
  {
    label: 'Products',
    key: 'products',
    icon: <TagOutlined />,
  },
  {
    label: 'Categories',
    key: 'categories',
    icon: <TagOutlined />,
  },
  {
    label: 'Orders',
    key: 'orders',
    icon: <ShoppingCartOutlined />,
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: <LoginOutlined />,
  },
];

const AdminMenu: React.FC = () => {
  const { navigateTo } = useCustomRouter();
  const { logout } = useLogout();
  const pathName = usePathname().split('/')[2];

  const handleClickMenu: MenuProps['onClick'] = (e) => {
    const itemKey = _.find(menuItem, { key: e.key });
    if (itemKey?.key === 'logout') {
      logout();
    } else {
      navigateTo(`/admin/${e.key}`);
    }
  };

  return (
    <Layout.Sider className='fixed h-screen overflow-auto left-0 top-0 bottom-0 z-50 bg-slate-900'>
      <div className='mb-10 flex items-center justify-center text-white p-5 h-[100px] font-bold text-2xl'>
        Admin Page
      </div>
      <Menu
        theme='dark'
        mode='inline'
        selectedKeys={[pathName ? pathName : 'home']}
        items={menuItem}
        defaultSelectedKeys={['home']}
        onClick={handleClickMenu}
      />
    </Layout.Sider>
  );
};

export default AdminMenu;
