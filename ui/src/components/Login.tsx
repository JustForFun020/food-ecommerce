'use client';

import React, { useState } from 'react';
import { Button, ConfigProvider, Form, Input, notification } from 'antd';
import Link from 'next/link';
import { FetchResult, useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '@/lib/graphql/mutation';
import '@/style/auth.css';
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch } from '@/lib/hook/useAppDispatch';
import { getLoginInfo } from '@/lib/redux/user/reducer';
import { usernameRules } from '@/utils/formValidate';
import { useCustomRouter } from '@/lib/hook/useCustomRouter';

interface LoginProps {
  username: string;
  password: string;
}

const Login = () => {
  const [loginValue, setLoginValue] = useState<LoginProps>({} as LoginProps);

  const { navigateTo } = useCustomRouter();
  const dispatch = useAppDispatch();

  const [login, { loading: formLoading, data, error }] = useMutation(LOGIN_MUTATION);

  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const handleLoginSuccess = (res: FetchResult<any>) => {
    localStorage.setItem('token', res.data.login.token);
    const decoded: any = jwtDecode(res.data.login.token);
    if (decoded.role[0].roleId === 1) {
      navigateTo('/admin');
    } else {
      navigateTo('/');
    }
    form.resetFields();
  };

  const onFinish = (values: LoginProps) => {
    dispatch(getLoginInfo({ username: values.username }));
    login({
      variables: {
        loginDto: values,
      },
    })
      .then((res) => {
        handleLoginSuccess(res);
      })
      .catch((error) => {
        openErrorNotification(error.message);
      });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValue({
      ...loginValue,
      [e.target.name]: e.target.value,
    });
  };

  const openErrorNotification = (message: string) => {
    api.error({
      message: 'Error',
      description: message,
    });
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultHoverBg: '#1e293b',
            defaultHoverColor: '#f9fafb',
            defaultHoverBorderColor: '#cbd5e1',
          },
        },
      }}
    >
      {contextHolder}
      <main className='login__container flex text-white items-center justify-center flex-col'>
        <h1 className=' underline underline-offset-[20px] z-50 login__title mb-14 text-6xl font-bold'>Login</h1>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          onFinish={onFinish}
          labelAlign='left'
          className='z-50 bg-slate-100 p-10 min-h-[350px] min-w-[450px] rounded-xl'
        >
          <Form.Item name='username' rules={usernameRules} label='Username'>
            <Input type='text' placeholder='Username' name='username' onChange={onInputChange} />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            label='Password'
          >
            <Input.Password name='password' type='password' placeholder='Password' onChange={onInputChange} />
          </Form.Item>
          <Form.Item>
            <Link href={'/'} className='hover:opacity-100 opacity-55 float-right'>
              Forgot password!!
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              loading={formLoading}
              htmlType='submit'
              className='w-full p-5 bg-slate-900 text-white hover:bg-slate-800'
            >
              Login
            </Button>
          </Form.Item>
          <Form.Item className='text-center'>
            If you do not have an account?{' '}
            <Link href={'/sign-up'} className='hover:opacity-100 opacity-55'>
              Sign Up
            </Link>
          </Form.Item>
        </Form>
      </main>
    </ConfigProvider>
  );
};

export default Login;
