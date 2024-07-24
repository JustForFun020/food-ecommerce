'use client';

import _ from 'lodash';
import React from 'react';
import { fakeCategories } from '../../../__mocks__/categories';
import { Avatar } from 'antd';
import '@/style/home.css';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES_QUERY } from '@/lib/graphql/query';
import { Categories } from '@/utils/types/product';

const ListCategories: React.FC = () => {
  const router = useRouter();

  const { loading, data } = useQuery(GET_ALL_CATEGORIES_QUERY);
  const listCategories: Categories[] = _.get(data, 'getCategories', []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-5 '>
      <h1 className='text-5xl font-bold opacity-85 tracking-wide text-slate-950 mb-6'>Categories</h1>
      <ul className='flex items-center justify-start flex-wrap'>
        {_.map(listCategories, (category, index) => {
          return (
            <li
              key={index}
              onClick={() => router.push(`/categories/${category.name}`)}
              className='categories__list_item w-[250px] mt-6 mb-6 ml-10 mr-10 flex items-center justify-center flex-col p-8 rounded-[12px] border border-slate-100 bg-slate-200'
            >
              <Avatar src={category.image} size={100} />
              <p className='mt-4 text-slate-900 text-xl font-medium'>{category.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListCategories;
