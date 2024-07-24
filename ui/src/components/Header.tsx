'use client';

import _ from 'lodash';
import React, { Fragment, useState } from 'react';
import { Avatar, Button, Dropdown, Input } from 'antd';
import type { MenuProps } from 'antd';
import logo from '@/assets/diet.png';
import Image from 'next/image';
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAuththor } from '@/lib/hook/useAuththor';
import SearchModal from './SearchModal';
import { useCustomRouter } from '@/lib/hook/useCustomRouter';

const Header = () => {
  const [isListSearchVisible, setListSearchVisible] = useState(false);

  const { navigateTo } = useCustomRouter();
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
          navigateTo('/login');
        }, 1000);
      },
    },
    {
      label: 'Profile',
      key: 'profile',
      icon: <UserOutlined />,
      onClick: () => navigateTo(`/user/${username}`),
    },
  ];

  const renderModalSearch = () => {
    return <SearchModal isListSearchVisible={isListSearchVisible} setListSearchVisible={setListSearchVisible} />;
  };

  const userIcon = () => {
    return (
      <Fragment>
        <Input.Search
          placeholder='Search food here...'
          className='w-[300px] cursor-pointer'
          onClick={() => setListSearchVisible(true)}
        />
        {renderModalSearch()}
        <Dropdown menu={{ items: dropDownMenu }} trigger={['click']} placement='topLeft'>
          <Avatar size='large' icon={<UserOutlined />} className='cursor-pointer' />
        </Dropdown>
      </Fragment>
    );
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='flex justify-between items-center w-1/2 gap-14'>
        <div className='w-1/3 flex items-center justify-between cursor-pointer' onClick={() => navigateTo('/')}>
          <Image src={logo} alt='logo' width={60} height={60} />
          <h1 className='text-4xl font-bold'>Foodie!!</h1>
        </div>
        <ul className='*:transition-all *:duration-200 w-2/3 flex items-center justify-between *:p-2 *:opacity-60 hover:*:opacity-100 *:font-medium *:cursor-pointer hover:*:underline hover:*:underline-offset-4'>
          <li onClick={() => navigateTo('/')}>Home</li>
          <li onClick={() => navigateTo('/explore')}>Explore</li>
          <li onClick={() => navigateTo('/order')}>Order</li>
          <li onClick={() => navigateTo('/contact')}>Contact</li>
        </ul>
      </div>
      <div className='w-1/2 flex justify-end gap-12 items-center'>
        {!_.isEmpty(currentUser) ? (
          userIcon()
        ) : (
          <>
            <Button onClick={() => navigateTo('/login')} className='flex items-center' icon={<LoginOutlined />}>
              Login
            </Button>
            <Button
              onClick={() => navigateTo('/sign-up')}
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
