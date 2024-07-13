'use client';

import _ from 'lodash';
import React, { Fragment } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Image from 'next/image';
import { Button, Card, Divider, Modal, Select, Tag } from 'antd';
import '@/style/categories.css';
import Link from 'next/link';
import { useQuery } from '@apollo/client';

const listProduct = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    image:
      'https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    image:
      'https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 300,
    image:
      'https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];
const Category = ({ category }: { category: string }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [product, setProduct] = React.useState({} as any);

  const openProductModal = (product: any) => {
    return (
      <Modal
        title={
          <div className='mb-8'>
            <p className='text-2xl'>{product.name}</p>
            <div>
              <Tag color='red'>Best seller</Tag>
              <Tag color='green'>Best seller</Tag>
            </div>
          </div>
        }
        open={isModalVisible}
        footer={[
          <Button key='add--btn' type='primary'>
            Add to cart
          </Button>,
        ]}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <div className='flex gap-4'>
          <div>
            <Image src={product.image} alt='' width={150} height={150} className='w-full rounded-lg' />
          </div>
          <div>
            <p>About product</p>
            <p>Price: {product.price}</p>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <main>
      <header className='p-6'>
        <Header />
      </header>
      <div className='p-6'>
        <div className='flex category__primary p-12 text-white rounded-lg before:rounded-lg'>
          <div className='mr-12 z-50'>
            <Image
              src='https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              width={300}
              alt=''
              height={300}
              className='rounded-3xl'
            />
          </div>
          <div className='z-50'>
            <h1 className='text-6xl tracking-wider font-bold'>{category}</h1>
            <p className='mt-6 mb-6 text-lg font-medium opacity-80'>Description: some thing about {category}</p>
            <p>Total Product: 13</p>
          </div>
          <Link
            href='/categories'
            className='absolute z-40 right-8 top-8 p-2 border border-slate-400 bg-[rgba(0,0,0,.3)] hover:bg-[rgba(0,0,0,.6)] rounded-xl transition-all duration-300'
          >
            View all categories
          </Link>
        </div>
        <Divider />
        <div className='gap-4 grid grid-cols-8 mt-8 mb-8'>
          <p className='opacity-70 font-medium'>Filter Product: </p>
          <Select placeholder='Sort by price'>
            <Select.Option value='low'>Low to high</Select.Option>
            <Select.Option value='high'>High to low</Select.Option>
          </Select>
          <Select placeholder='Sort by buy amount'>
            <Select.Option value='low'>Low to high</Select.Option>
            <Select.Option value='high'>High to low</Select.Option>
          </Select>
          <Select placeholder='Sort by population'>
            <Select.Option value='low'>Low to high</Select.Option>
            <Select.Option value='high'>High to low</Select.Option>
          </Select>
        </div>
        <div className='category__products'>
          <div className='grid grid-cols-5 gap-8'>
            {_.map(listProduct, (product) => {
              return (
                <Card
                  key={product.id}
                  onClick={() => {
                    setIsModalVisible(true);
                    setProduct(product);
                  }}
                  hoverable
                  cover={
                    <div>
                      <Image src={product.image} width={150} height={150} alt='' className='w-full' />
                    </div>
                  }
                >
                  <Card.Meta title={product.name} description={<p>Price: {product.price}</p>} />
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <footer className='p-6 bg-gray-200'>
        <Footer />
      </footer>
      {openProductModal(product)}
    </main>
  );
};

export default Category;
