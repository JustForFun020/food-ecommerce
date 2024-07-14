'use client';

import _ from 'lodash';
import { GET_USER_BY_USERNAME_QUERY } from '@/lib/graphql/query';
import { useMutation, useSuspenseQuery } from '@apollo/client';
import React from 'react';
import { User as UserType } from '@/utils/types/user';
import { Avatar, Divider, Drawer, Form, Input, message } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import '@/style/order.css';
import { UPDATE_USER_MUTATION } from '@/lib/graphql/mutation';

const Profile = ({ username }: { username: string }) => {
  const [isVisitableEditProfile, setIsVisitableEditProfile] = React.useState(false);
  const [messageUpdateError, setMessageUpdateError] = React.useState('Something went wrong!');

  const { data } = useSuspenseQuery(GET_USER_BY_USERNAME_QUERY, {
    variables: { username },
  });
  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      setIsVisitableEditProfile(false);
      form.resetFields();
    },
    onError: (error) => {
      message.error(error.message);
    },
    refetchQueries: [{ query: GET_USER_BY_USERNAME_QUERY, variables: { username } }],
  });

  const user: UserType = _.get(data, 'getUserByUsername', {}) as UserType;

  const [form] = Form.useForm();

  const onFinish = (values: { email: string; phone: string; address: string }) => {
    updateUser({
      variables: {
        updateUserDto: values,
      },
    });
  };

  const renderDrawerEditProfile = () => {
    return (
      <Drawer
        title={
          <div>
            Edit Profile: <span className='text-gray-500'>{user.username}</span>
          </div>
        }
        placement='right'
        size='large'
        open={isVisitableEditProfile}
        onClose={() => setIsVisitableEditProfile(false)}
      >
        <Form
          onFinish={onFinish}
          form={form}
          initialValues={{
            username: user.username,
            address: user.address,
            phone: user.phone,
            email: user.email,
          }}
          labelAlign='left'
          labelCol={{ span: 6 }}
        >
          <Form.Item label='Address' name='address'>
            <Input />
          </Form.Item>
          <Form.Item
            label='Phone'
            name='phone'
            rules={[
              {
                validator: (_, value) => {
                  const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
                  if (phoneRegex.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Phone number is invalid!');
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className='text-right'>
            <button
              type='submit'
              className='pt-3 pb-3 pr-4 pl-4 border border-slate-300 rounded-md bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.3)] hover:opacity-95 transition-all duration-200'
              disabled={loading}
            >
              Save
            </button>
          </Form.Item>
        </Form>
      </Drawer>
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
        {_.isEmpty(user.carts) ? (
          <div className='order__content min-h-screen mt-6 pr-20 pl-20'>{renderEmptyCartLayout()}</div>
        ) : (
          <div>Cart</div>
        )}
      </div>
      {renderDrawerEditProfile()}
    </div>
  );
};

export default Profile;
