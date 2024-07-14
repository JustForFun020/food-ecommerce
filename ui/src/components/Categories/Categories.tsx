'use client';

import _ from 'lodash';
import React from 'react';
import Header from '../Header';
import {  Divider, Image, Space } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES_QUERY } from '@/lib/graphql/query';
import { Categories as CategoriesType } from '@/utils/types/product';
import Footer from '../Footer';
import { useRouter } from 'next/navigation';

const Categories = () => {
  const router = useRouter();

  const { loading, data } = useQuery(GET_ALL_CATEGORIES_QUERY);
  const categories = _.get<CategoriesType[]>(data, 'getCategories', [] as CategoriesType[]);

  if (loading) return <div>Loading....</div>;

  return (
    <main>
      <header className='pt-8 pr-12 pl-12'>
        <Header />
      </header>
      <Divider />
      <div className='mt-4 mb-10 pr-28 pl-28'>
        <h1 className='text-3xl font-bold mb-8 tracking-wide leading-8 opacity-65'>Categories</h1>
        <Space
          direction='vertical'
          styles={{
            item: {
              width: '100%',
            },
          }}
          className='w-full'
          size={64}
        >
          {categories.map((category, index) => (
            <div
              className='flex pt-6 pb-6 pl-12 pr-12 shadow-sm hover:shadow-lg cursor-pointer border border-slate-200 rounded-lg w-full transition-all duration-200'
              key={index}
              onClick={() => router.push(`/categories/${category.name}`)}
            >
              <Image src={category.image} alt={category.name} width={300} height={150} preview={false} />
              <Divider type='vertical' />
              <div className='w-2/3'>
                <h1 className='mb-6 text-3xl tracking-wide font-bold'>{category.name}</h1>
                <div className='*:leading-8 *:opacity-60 *:font-medium'>
                  <p>{category.description}</p>
                  <p>Total Product: {category.products?.length ?? 0}</p>
                </div>
              </div>
            </div>
          ))}
        </Space>
      </div>
      <footer className='p-6 bg-gray-200'>
        <Footer />
      </footer>
    </main>
  );
};

export default Categories;
