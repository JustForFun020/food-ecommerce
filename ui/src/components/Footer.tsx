import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';

const Footer = () => {
  return (
    <Row>
      <Col span={8} className=''>
        <p className='mb-3 text-center text-2xl font-bold'>About Us</p>
        <p className='leading-6 text-lg opacity-70 text-center'>
          We are committed to providing the best service to our customers. We are a team of dedicated professionals who
          are passionate about what we do.
        </p>
      </Col>
      <Col span={8} className='text-center'>
        <p className='mb-3 text-center text-2xl font-bold'>Contact</p>
        <p className='leading-8 text-lg opacity-70'>Email: jusforfun@foodie.com</p>
        <p className='leading-8 text-lg opacity-70'>Phone: (+234) 123 456 7890</p>
      </Col>
      <Col span={8} className='text-center'>
        <p className='mb-3 text-center text-2xl font-bold'>Follow Us</p>
        <p className='text-4xl'>
          <FacebookOutlined className='cursor-pointer' />
          <TwitterOutlined className='ml-6 mr-6 cursor-pointer' />
          <InstagramOutlined className='cursor-pointer' />
        </p>
      </Col>
    </Row>
  );
};

export default Footer;
