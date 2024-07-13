'use client';

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';
import { fakeAdmin } from '../../../__mocks__/admin';

const AdminHome = () => {
  return (
    <main className='flex gap-10'>
      <div>
        <Avatar size={64} icon={<UserOutlined />} />
      </div>
      <div className='ml-10 *:mb-8'>
        <div>
          <h1 className='-tracking-tight text-3xl opacity-80 font-medium mb-2'>Base Information</h1>
          <ul className='p-8 border border-slate-300 rounded-lg *:leading-10'>
            <li>Username: {fakeAdmin.username}</li>
            <li>Address: {fakeAdmin.address}</li>
          </ul>
        </div>
        <div>
          <h1 className='-tracking-tight text-3xl opacity-80 font-medium mb-2'>Contact Information</h1>
          <ul className='p-8 border border-slate-300 rounded-lg *:leading-10'>
            <li>Email: {fakeAdmin.email}</li>
            <li>Phone: {fakeAdmin.phone}</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default AdminHome;
