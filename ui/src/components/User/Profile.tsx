'use client';

import React, { useState } from 'react';
import { Avatar, Divider } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { useSuspenseQuery } from '@apollo/client';
import _ from 'lodash';
import { GET_USER_BY_USERNAME_QUERY } from '@/lib/graphql/query';
import { User as UserType } from '@/utils/types/user';
import EditProfile from './EditProfile';
import { formatDate } from '@/utils/formatDate';
import { getUserData } from '@/utils/userData';
import '@/style/order.css';
import HistoryPurchased from './HistoryPurchased';

interface ProfileProps {
  username: string;
}

const Profile: React.FC<ProfileProps> = ({ username }) => {
  const [isVisitableEditProfile, setIsVisitableEditProfile] = useState(false);

  const { data } = useSuspenseQuery(GET_USER_BY_USERNAME_QUERY, {
    variables: { username },
  });

  const user: UserType = getUserData(data);

  const renderUserInfo = (label: string, value: string | undefined) => (
    <div>
      <p className='text-lg font-bold leading-9'>{label}</p>
      <p className='font-medium opacity-70'>{value ?? 'No information'}</p>
    </div>
  );

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
          {renderUserInfo('Address', user.address)}
          {renderUserInfo('Phone', user.phone)}
          {renderUserInfo('Email', user.email)}
        </div>
      </div>
      <Divider />
      <div>
        <h1 className='text-2xl font-bold tracking-wide mb-5 opacity-75'>Purchases history</h1>
        <HistoryPurchased invoices={user.invoices} />
      </div>
      <EditProfile
        user={user}
        isVisitableEditProfile={isVisitableEditProfile}
        setIsVisitableEditProfile={setIsVisitableEditProfile}
      />
    </div>
  );
};

export default Profile;
