'use client';

import _ from 'lodash';
import React, { Fragment, useEffect } from 'react';
import { Avatar, Button, Dropdown, Input } from 'antd';
import type { MenuProps } from 'antd';
import logo from '@/assets/diet.png';
import Image from 'next/image';
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuththor } from '@/lib/hook/useAuththor';
import { useAppSelector } from '@/lib/hook/useAppSelector';
import { RootState } from '@/utils/types/redux';

const Header = () => {
  const router = useRouter();
  const { currentUser } = useAuththor();

  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : '';

  const dropDownMenu: MenuProps['items'] = [
    {
      label: 'Logout',
      key: 'logout',
      icon: <LogoutOutlined />,
      onClick: async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      },
    },
    {
      label: 'Profile',
      key: 'profile',
      icon: <UserOutlined />,
      onClick: () => router.push(`/user/${username}`),
    },
  ];

  const userIcon = () => {
    return (
      <Fragment>
        <Input.Search placeholder='Search food here...' className='w-[300px]' />
        <Dropdown menu={{ items: dropDownMenu }} trigger={['click']} placement='topLeft'>
          <Avatar size='large' icon={<UserOutlined />} className='cursor-pointer' />
        </Dropdown>
      </Fragment>
    );
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='flex justify-between items-center w-1/2 gap-14'>
        <div className='w-1/3 flex items-center justify-between cursor-pointer' onClick={() => router.push('/')}>
          <Image src={logo} alt='logo' width={60} height={60} />
          <h1 className='text-4xl font-bold'>Foodie!!</h1>
        </div>
        <ul className='*:transition-all *:duration-200 w-2/3 flex items-center justify-between *:p-2 *:opacity-60 hover:*:opacity-100 *:font-medium *:cursor-pointer hover:*:underline hover:*:underline-offset-4'>
          <li onClick={() => router.push('/')}>Home</li>
          <li onClick={() => router.push('/explore')}>Explore</li>
          <li onClick={() => router.push('/order')}>Order</li>
          <li onClick={() => router.push('/contact')}>Contact</li>
        </ul>
      </div>
      <div className='w-1/2 flex justify-end gap-12 items-center'>
        {!_.isEmpty(currentUser) ? (
          userIcon()
        ) : (
          <>
            <Button onClick={() => router.push('/login')} className='flex items-center' icon={<LoginOutlined />}>
              Login
            </Button>
            <Button
              onClick={() => router.push('/sign-up')}
              className='flex items-center'
              icon={<LoginOutlined />}
              type='primary'
            >
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
