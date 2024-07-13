import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <header className='h-24 bg-slate-900 pt-4 pb-4 pl-10 pr-10 text-white'>
        <Header />
      </header>
      <section>{children}</section>
      <footer className='p-6 bg-gray-200'>
        <Footer />
      </footer>
    </main>
  );
};

export default UserLayout;
