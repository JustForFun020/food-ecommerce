import React, { Suspense } from 'react';
import Content from '@/components/Home/Content';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });

const HomeLayout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className='flex flex-col before:absolute'>
        <header className='h-24 bg-slate-900 pt-4 pb-4 pl-10 pr-10 text-white'>
          <Header />
        </header>
        <div className='min-h-screen text-white'>
          <Content />
        </div>
        <footer className='p-6 bg-gray-200'>
          <Footer />
        </footer>
      </main>
    </Suspense>
  );
};

export default HomeLayout;
