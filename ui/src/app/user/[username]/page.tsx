import UserLayout from '@/layout/UserLayout';
import dynamic from 'next/dynamic';
import React from 'react';

const Profile = dynamic(() => import('@/components/User/Profile'), { ssr: false });

const UserPage = ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const { username } = params;
  const validUsername = decodeURIComponent(username);
  return (
    <UserLayout>
      <Profile username={validUsername} />
    </UserLayout>
  );
};

export default UserPage;
