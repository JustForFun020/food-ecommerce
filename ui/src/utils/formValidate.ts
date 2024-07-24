import type { FormInstance, Rule } from 'antd/es/form';

export const usernameRules: Rule[] = [{ required: true, message: 'Please input your username!' }];

export const emailRules: Rule[] = [
  { required: true, message: 'Please input your email!' },
  { type: 'email', message: 'Please input a valid email!' },
];

export const passwordRules: Rule[] = [
  { required: true, message: 'Please input your password!' },
  { min: 8, message: 'Password must be at least 8 characters' },
];

export const confirmPasswordRules = (form: FormInstance): Rule[] => [
  { required: true, message: 'Please input your confirm password!' },
  {
    validator: (_: any, value: string) => {
      if (!value || form.getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject('The confirm passwords do not match!');
    },
  },
];

export const phoneRules = [
  {
    validator: (_: any, value: string) => {
      const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
      if (phoneRegex.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject('Phone number is invalid!');
    },
  },
];
