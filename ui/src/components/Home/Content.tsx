import React from 'react';
import '@/style/home.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Rate from './Rate';

const ListProducts = dynamic(() => import('./ListProducts'), { ssr: false });
const ListCategories = dynamic(() => import('./ListCategories'), { ssr: false });

const Content = () => {
  return (
    <div className='content__container'>
      <div className='content__container_primary flex items-center justify-center flex-col'>
        <div className='z-50 mb-5 text-center pb-3 border-b border-b-slate-300'>
          <h1 className='font-bold text-[100px] tracking-wider'>Foodie!!!</h1>
          <span className='opacity-75'>The best place to find your favorite food</span>
        </div>
        <ul className='z-50 leading-8 text-[20px] w-[400px]' style={{ listStyle: 'initial' }}>
          <li className=''>We are here to serve you the best food.</li>
          <li className='mt-4 mb-4'>We have a wide range of food items to choose from.</li>
          <li>Order now and get it delivered to your doorstep, hot and fresh.</li>
        </ul>
        <Link
          href={'/order'}
          className='z-50 text-cyan-400 mt-[60px] p-4 border border-slate-300 rounded-[15px] bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.8)] transition-all duration-300 opacity-80 font-medium'
        >
          Order now and enjoy your meal!!
        </Link>
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ListProducts />
        <ListCategories />
      </React.Suspense>
      <Rate />
    </div>
  );
};

export default Content;
