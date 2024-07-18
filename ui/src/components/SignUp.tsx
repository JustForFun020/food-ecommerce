'use client';

import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import '@/style/auth.css';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '@/lib/graphql/mutation';
import { useRouter } from 'next/navigation';
import _ from 'lodash';

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [signUpDto, setSignUpDto] = useState<SignUpProps>({} as SignUpProps);

  const [form] = Form.useForm();
  const router = useRouter();

  const [signup, { loading: signUpLoading, error: signUpError }] = useMutation(SIGNUP_MUTATION, {
    onError: (error) => {
      message.error(error.message);
    },
    onCompleted: (data) => {
      const res = _.get(data, 'signup', {});
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', signUpDto.username);
      router.push('/');
      form.resetFields();
    },
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpDto({ ...signUpDto, [e.target.name]: e.target.value });
  };

  const onFinish = async (values: any) => {
    const { confirmPassword, ...value } = values;
    try {
      await signup({
        variables: {
          signUpDto: value,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className='signup__container h-screen w-full flex text-white items-center justify-center flex-col'>
      <h1 className=' underline underline-offset-[20px] z-50 login__title mb-14 text-6xl font-bold'>Sign Up</h1>
      <Form
        form={form}
        className='w-[530px] min-h-[400px] p-10 rounded-xl bg-slate-100 z-50'
        labelAlign='left'
        labelCol={{ span: 8 }}
        onFinish={onFinish}
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input onChange={onInputChange} name='username' />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Please input a valid email!',
            },
          ]}
        >
          <Input onChange={onInputChange} name='email' />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 8,
              message: 'Password must be at least 8 characters',
            },
          ]}
        >
          <Input.Password onChange={onInputChange} name='password' />
        </Form.Item>
        <Form.Item
          label='Confirm Password'
          name='confirmPassword'
          rules={[
            {
              required: true,
              message: 'Please input your confirm password!',
            },
            {
              validator: (rule, value) => {
                if (!value || form.getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The confirm passwords do not match!');
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='w-full' htmlType='submit' loading={signUpLoading}>
            Sign up
          </Button>
        </Form.Item>
        <Form.Item className='text-center opacity-55 font-medium'>
          If you already have an account?{' '}
          <Link className='hover:opacity-100' href='/login'>
            Login
          </Link>
        </Form.Item>
      </Form>
    </main>
  );
};

export default SignUp;
