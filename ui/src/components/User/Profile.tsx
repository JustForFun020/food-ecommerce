'use client';

import _ from 'lodash';
import React, { useState } from 'react';
import { GET_USER_BY_USERNAME_QUERY } from '@/lib/graphql/query';
import { useSuspenseQuery } from '@apollo/client';
import { User as UserType } from '@/utils/types/user';
import { Avatar, Divider } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import '@/style/order.css';
import EditProfile from './EditProfile';
import moment from 'moment';

const Profile = ({ username }: { username: string }) => {
  const [isVisitableEditProfile, setIsVisitableEditProfile] = useState(false);

  const { data } = useSuspenseQuery(GET_USER_BY_USERNAME_QUERY, {
    variables: { username },
  });

  const user: UserType = _.get(data, 'getUserByUsername', {}) as UserType;

  const renderDrawerEditProfile = () => {
    return (
      <EditProfile
        user={user}
        isVisitableEditProfile={isVisitableEditProfile}
        setIsVisitableEditProfile={setIsVisitableEditProfile}
      />
    );
  };

  const renderEmptyCartLayout = () => {
    return (
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-bold mb-3 tracking-wide'>Your cart is empty</h1>
        <p className='text-gray-500'>Looks like you have not added anything to your cart yet</p>
        <Link
          className='mt-4 p-4 border border-slate-400 bg-[rgba[0,0,0,0.1]] hover:bg-sky-400 hover:border-none hover:text-white rounded-lg transition-all duration-200'
          href={'/explore'}
        >
          Start shopping
        </Link>
      </div>
    );
  };

  return (
    <div className='p-8'>
      <div className='w-[664px] m-auto p-6 border border-slate-200 rounded-lg bg-[rgba(0,0,0,.05)] shadow-md h-fit]'>
        <div className='flex relative'>
          <Avatar size={64} icon={<UserOutlined />} />
          <div className='ml-8'>
            <p className='text-xl font-bold'>{user.username}</p>
            <p className='opacity-70 font-medium'>ID: {user.id}</p>
          </div>
          <button
            onClick={() => setIsVisitableEditProfile(true)}
            className='p-2 right-4 top-4 absolute opacity-60 hover:opacity-90 transition-all duration-200'
          >
            <EditOutlined className='text-xl' />
          </button>
        </div>
        <Divider />
        <div className='mt-6 *:mb-4'>
          <div>
            <p className='text-lg font-bold leading-9'>Address</p>
            <p className='font-medium opacity-70'>{user.address ?? 'No information'}</p>
          </div>
          <div>
            <p className='text-lg font-bold leading-9'>Phone</p>
            <p className='font-medium opacity-70'>{user.phone ?? 'No information'}</p>
          </div>
          <div>
            <p className='text-lg font-bold leading-9'>Email</p>
            <p className='font-medium opacity-70'>{user.email ?? 'No information'}</p>
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <h1 className='text-2xl font-bold tracking-wide mb-5 opacity-75'>Purchases history</h1>
        {_.isEmpty(user.invoices) ? (
          <div>You dont have any invoices</div>
        ) : (
          <ul className='*:leading-8'>
            {_.map(user.invoices, (invoice) => {
              return (
                <li className='flex justify-between items-center pt-4 pb-4 pr-10 pl-10 border border-slate-200 rounded-md shadow-md mb-5'>
                  <p className='flex flex-col *:leading-8'>
                    <span className='font-medium'>{invoice.name}</span>
                    <span className='opacity-65'>{moment(invoice.createdAt).format('HH:mm DD/MM/YYYY')}</span>
                  </p>
                  <p className='font-medium opacity-65'>$ {invoice.price}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {renderDrawerEditProfile()}
    </div>
  );
};

export default Profile;
