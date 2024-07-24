'use client';

import _ from 'lodash';
import { Avatar, Carousel } from 'antd';
import React from 'react';
import { testimonials } from '../../../__mocks__/testtimonial';
import { UserOutlined } from '@ant-design/icons';

const Rate: React.FC = () => {
  return (
    <div className='p-6 bg-slate-700'>
      <h1 className='text-5xl font-bold opacity-85 tracking-wide mb-4'>Customer Testimonials</h1>
      <Carousel autoplay>
        <div>
          <div className='flex items-center justify-between m-8'>
            {_.map(_.slice(testimonials, 0, 3), (testimonial, index) => {
              return (
                <div key={index} className='flex items-center justify-center flex-col'>
                  <Avatar size={64} icon={<UserOutlined />} className='mb-6' />
                  <div className='w-[400px] text-center leading-8 text-white opacity-70'>{testimonial.message}</div>
                  <h3 className='mt-5 text-2xl font-bold text-slate-300'>- {testimonial.username} -</h3>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className='flex items-center justify-center m-8 gap-40'>
            {_.map(_.slice(testimonials, 3, 5), (testimonial, index) => {
              return (
                <div key={index} className='flex items-center justify-center flex-col'>
                  <Avatar size={64} icon={<UserOutlined />} className='mb-6' />
                  <div className='w-[400px] text-center leading-8 text-white opacity-70'>{testimonial.message}</div>
                  <h3 className='mt-5 text-2xl font-bold text-slate-300'>- {testimonial.username} -</h3>
                </div>
              );
            })}
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Rate;
