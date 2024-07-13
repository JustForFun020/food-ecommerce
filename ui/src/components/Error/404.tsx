import React from 'react';
import '@/style/error.css';

const PageNotFound = ({ name }: { name: string }) => {
  return (
    <div className='not-found__container h-screen flex items-center'>
      <div className='ml-8 w-1/3'>
        <h1 className='text-[72px] mb-4 tracking-wide font-bold text-sky-500'>Oop!!! Page Not Found</h1>
        <p className='text-lg font-medium opacity-75'>
          The {name} you are looking for is not available. Please try again later.
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
