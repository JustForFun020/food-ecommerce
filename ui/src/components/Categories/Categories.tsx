'use client';

import _ from 'lodash';
import React from 'react';
import Header from '../Header';
import { Button, Divider, Tooltip } from 'antd';

const Categories = () => {
  const [activeButton, setActiveButton] = React.useState(0);

  return (
    <main>
      <header className='pt-8 pr-12 pl-12'>
        <Header />
      </header>
      <Divider />
      <div className='mt-4 mb-4 pr-28 pl-28'>
        <div className='grid grid-cols-8 gap-3 mb-8'>
          <Button className='p-5' onClick={() => setActiveButton(0)} type={activeButton === 0 ? 'primary' : 'default'}>
            All
          </Button>
          <Button className='p-5' onClick={() => setActiveButton(1)} type={activeButton === 1 ? 'primary' : 'default'}>
            Best Seller
          </Button>
          <Button className='p-5' onClick={() => setActiveButton(2)} type={activeButton === 2 ? 'primary' : 'default'}>
            Most Viewer
          </Button>
        </div>
        <h1 className='text-2xl font-bold'>Categories</h1>
        <div className='grid grid-cols-3 gap-4'>
          {_.times(9, (index) => (
            <Tooltip key={index} title={<div>This is</div>}>
              <div className='bg-white p-4 rounded-md shadow-md'>
                <h2 className='text-lg font-bold'>Category {index + 1}</h2>
                <p className='text-sm mt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Categories;
