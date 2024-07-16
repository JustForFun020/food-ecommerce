'use client';

import _ from 'lodash';
import { GET_ALL_USERS_QUERY } from '@/lib/graphql/query';
import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useCallback, useEffect } from 'react';
import { User } from '@/utils/types/user';
import { Avatar, Button, Table } from 'antd';
import type { TableProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Cart, Invoice } from '@/utils/types/cart';

const AdminUsers = () => {
  const { loading, data } = useQuery(GET_ALL_USERS_QUERY);
  const [refreshGetAllUsers] = useLazyQuery(GET_ALL_USERS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  const refreshData = useCallback(() => {
    refreshGetAllUsers();
  }, [refreshGetAllUsers]);

  const dataSource = _.get(data, 'getAllUser', []) as User[];

  const columns: TableProps<any>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (address: string) => {
        return address ? (
          <span>{address}</span>
        ) : (
          <span>
            <span className='text-red-500 opacity-70'>Not update address</span>
          </span>
        );
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => {
        return phone ? (
          <span>{phone}</span>
        ) : (
          <span>
            <span className='text-red-500 opacity-70'>Not update phone</span>
          </span>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => {
        return <Avatar src={avatar ? avatar : ''} icon={!avatar && <UserOutlined />} size={64} />;
      },
    },
    {
      title: 'Total Purchase',
      dataIndex: 'totalPurchase',
      key: 'totalPurchase',
      render: (carts: Cart) => {
        const totalPurchase = carts?.invoice
          ? _.reduce<Invoice, number>(
              carts?.invoice,
              (acc, item: any) => {
                return acc + item.price;
              },
              0,
            )
          : 0;
        return <div>{totalPurchase}</div>;
      },
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-8'>
      <div className='mb-10'>
        <p>Total Users</p>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        title={() => (
          <div className='relative'>
            <div className='text-center text-2xl tracking-wide '>List Users</div>
            <Button
              onClick={refreshData}
              className='absolute right-4 top-[2px] border p-2 rounded-lg hover:bg-[rgba(0,0,0,0.1)] transition-all duration-200'
            >
              Refresh
            </Button>
          </div>
        )}
        loading={loading}
      />
    </div>
  );
};

export default AdminUsers;
