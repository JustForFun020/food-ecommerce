'use client';

import _ from 'lodash';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Avatar, Button, Dropdown, Input, Modal } from 'antd';
import type { MenuProps } from 'antd';
import logo from '@/assets/diet.png';
import Image from 'next/image';
import { CloseOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuththor } from '@/lib/hook/useAuththor';
import { useDebounceValue } from 'usehooks-ts';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_PRODUCT_QUERY } from '@/lib/graphql/query';
import { Product } from '@/utils/types/product';

const Header = () => {
  const [isListSearchVisible, setListSearchVisible] = useState(false);
  const [defaultDebounceValue, setDefaultDebounceValue] = useState('');
  const [debouncedValue, setValue] = useDebounceValue(defaultDebounceValue, 500);

  const [searchProduct, { loading, data }] = useLazyQuery(SEARCH_PRODUCT_QUERY);
  const listSearchProduct = _.get<Product[]>(data, 'searchProduct', []);

  useEffect(() => {
    setValue(defaultDebounceValue);
  }, [defaultDebounceValue, setValue]);

  useEffect(() => {
    handleSearch();
  }, [debouncedValue]);

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

  const handleSearch = () => {
    if (debouncedValue) {
      searchProduct({
        variables: {
          name: debouncedValue,
        },
      });
    }
  };

  const renderModalSearch = () => {
    return (
      <Modal
        open={isListSearchVisible}
        footer={[]}
        closable={false}
        title={
          <div className='flex items-center justify-between'>
            <Input.Search
              placeholder='Search food here...'
              className='w-[300px]'
              onChange={(e) => {
                setDefaultDebounceValue(e.target.value);
              }}
              onClick={() => setListSearchVisible(true)}
              value={defaultDebounceValue}
            />
            <Button
              icon={<CloseOutlined />}
              onClick={() => {
                setListSearchVisible(false);
                setDefaultDebounceValue('');
              }}
            ></Button>
          </div>
        }
      >
        {debouncedValue === '' ? (
          <div className='p-18 flex items-center justify-center text-lg opacity-65 font-medium mt-10'>Not Found</div>
        ) : (
          <Fragment>
            <ul className='*:leading-8 *:shadow-sm *:hover:opacity-100 *:opacity-70 transition-all duration-200 pt-6 pb-6'>
              {listSearchProduct.map((product) => (
                <li
                  key={product.id}
                  onClick={() => router.push(`/product/${product.name}`)}
                  className='mb-2 pb-2 border-b border-b-slate-950 *:text-lg shadow-md cursor-pointer flex justify-between items-center'
                >
                  <span>{product.name}</span>
                  <span>$ {product.price}</span>
                </li>
              ))}
            </ul>
          </Fragment>
        )}
      </Modal>
    );
  };

  const userIcon = () => {
    return (
      <Fragment>
        <Input.Search
          placeholder='Search food here...'
          className='w-[300px]'
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
