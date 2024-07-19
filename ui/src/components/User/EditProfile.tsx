import { UPDATE_USER_MUTATION } from '@/lib/graphql/mutation';
import { GET_USER_BY_USERNAME_QUERY } from '@/lib/graphql/query';
import { User } from '@/utils/types/user';
import { useMutation } from '@apollo/client';
import { Drawer, Form, Input, message } from 'antd';
import React from 'react';

interface EditProfileProps {
  user: User;
  isVisitableEditProfile: boolean;
  setIsVisitableEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfile = ({ user, isVisitableEditProfile, setIsVisitableEditProfile }: EditProfileProps) => {
  const [form] = Form.useForm();

  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      setIsVisitableEditProfile(false);
      form.resetFields();
    },
    onError: (error) => {
      message.error(error.message);
    },
    refetchQueries: [{ query: GET_USER_BY_USERNAME_QUERY, variables: { username: user.username } }],
  });

  const onFinish = (values: { email: string; phone: string; address: string }) => {
    updateUser({
      variables: {
        updateUserDto: {
          ...values,
          username: user.username,
        },
      },
    });
  };

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

export default EditProfile;
