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

const AdminMenu = () => {
  const router = useRouter();
  const pathName = usePathname().split('/')[2];

  const handleClickMenu: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'home':
        router.push('/admin');
        break;
      case 'dashboard':
        router.push('/admin/dashboard');
        break;
      case 'users':
        router.push('/admin/users');
        break;
      case 'products':
        router.push('/admin/products');
        break;
      case 'categories':
        router.push('/admin/categories');
        break;
      case 'orders':
        router.push('/admin/orders');
        break;
      case 'logout':
        localStorage.removeItem('token');
        router.push('/login');
        break;
      default:
        break;
    }
  };

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
