import Link from 'next/link';
import React from 'react';

const EmptyCart = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-5xl font-bold mb-3 tracking-wide'>Your cart is empty</h1>
      <p className='text-gray-500'>Looks like you have not added anything to your cart yet</p>
      <Link
        className='mt-4 p-4 border border-slate-400 bg-[rgba[0,0,0,0.1]] hover:bg-sky-400 hover:border-none hover:text-white rounded-lg transition-all duration-200'
        href={'/explore'}
      >
        Start shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
