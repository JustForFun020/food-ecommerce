'use client';

import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import '@/style/auth.css';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '@/lib/graphql/mutation';
import _ from 'lodash';
import { useCustomRouter } from '@/lib/hook/useCustomRouter';
import { confirmPasswordRules, emailRules, passwordRules, usernameRules } from '@/utils/formValidate';

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [signUpDto, setSignUpDto] = useState<SignUpProps>({} as SignUpProps);
  const { navigateTo } = useCustomRouter();

  const [form] = Form.useForm();

  const [signup, { loading: signUpLoading, error: signUpError }] = useMutation(SIGNUP_MUTATION, {
    onError: (error) => {
      message.error(error.message);
    },
    onCompleted: (data) => {
      const res = _.get(data, 'signup', {});
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', signUpDto.username);
      navigateTo('/');
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
        <Form.Item label='Username' name='username' rules={usernameRules}>
          <Input onChange={onInputChange} name='username' />
        </Form.Item>
        <Form.Item label='Email' name='email' rules={emailRules}>
          <Input onChange={onInputChange} name='email' />
        </Form.Item>
        <Form.Item label='Password' name='password' rules={passwordRules}>
          <Input.Password onChange={onInputChange} name='password' />
        </Form.Item>
        <Form.Item label='Confirm Password' name='confirmPassword' rules={confirmPasswordRules(form)}>
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
