'use client';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider } from 'antd';
import React from 'react';
import { fakeAdmin } from '../../../__mocks__/admin';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_USERNAME_QUERY } from '@/lib/graphql/query';
import _ from 'lodash';
import { User } from '@/utils/types/user';

const AdminHome: React.FC = () => {
  const { loading, data } = useQuery(GET_USER_BY_USERNAME_QUERY, {
    variables: {
      username: 'admin',
    },
  });
  const adminProfile = _.get<User>(data, 'getUserByUsername', {} as User);

  if (loading) return <p>Loading...</p>;

  return (
    <main className='p-10'>
      <div className='mt-8 text-center *:leading-8'>
        <h1 className='text-4xl tracking-wide mb-8 font-bold'>Welcome {adminProfile.username} to the Admin Panel!</h1>
        <p className='opacity-60 font-medium'>You can manage the restaurant here.</p>
      </div>
      <Divider />
      <div className='flex *:text-lg'>
        <div className='w-1/4 text-center flex flex-col items-center'>
          <Avatar size={64} icon={<UserOutlined />} className='mt-24 mb-4' />
          <span className='opacity-70 font-medium'>{adminProfile.username}</span>
        </div>
        <div className='ml-10 *:mb-8 w-3/4'>
          <div>
            <h1 className='-tracking-tight text-3xl opacity-80 font-medium mb-2'>Base Information</h1>
            <ul className='p-8 border border-slate-300 rounded-lg *:leading-10'>
              <li>Username: {adminProfile?.username}</li>
              <li>Address: {adminProfile?.address ?? 'No information'}</li>
            </ul>
          </div>
          <div>
            <h1 className='-tracking-tight text-3xl opacity-80 font-medium mb-2'>Contact Information</h1>
            <ul className='p-8 border border-slate-300 rounded-lg *:leading-10'>
              <li>Email: {adminProfile?.email ?? 'No information'}</li>
              <li>Phone: {adminProfile?.phone ?? 'No information'}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminHome;
