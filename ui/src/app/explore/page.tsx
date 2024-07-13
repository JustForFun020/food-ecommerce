import dynamic from 'next/dynamic';
import React from 'react';

const Explore = dynamic(() => import('../../components/Explore/Explore'), { ssr: false });

const ExplorePage = () => {
  return <Explore />;
};

export default ExplorePage;
