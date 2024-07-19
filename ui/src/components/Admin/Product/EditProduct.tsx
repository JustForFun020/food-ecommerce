import React from 'react';
import { Button, Drawer, Image } from 'antd';
import { Product } from '@/utils/types/product';

interface EditProductProps {
  isVisitableDrawer: boolean;
  setIsVisitableDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
}

const EditProduct = ({ product, isVisitableDrawer, setIsVisitableDrawer }: EditProductProps) => {
  return (
    <Drawer
      title={`Product: ${product?.name}`}
      zIndex={123142342}
      placement='right'
      closable={true}
      open={isVisitableDrawer}
      onClose={() => setIsVisitableDrawer(false)}
      width={800}
      extra={[
        <Button className='mr-6' key={'delete'} danger>
          Delete
        </Button>,
        <Button key={'update'} type='primary'>
          Update
        </Button>,
      ]}
    >
      <div className='flex'>
        <Image
          className='w-1/3'
          src={product?.images[0].imageUrl}
          alt={product?.images[0].image}
          width={300}
          height={300}
        />
        <div className='ml-8 w-2/3'>
          <h1 className='text-2xl font-medium opacity-80 mb-2'>Common Information</h1>
          <ul className='*:leading-7'>
            <li>ID: {product?.id}</li>
            <li>Name: {product?.name}</li>
            <li>Price: ${product?.price}</li>
            <li>Category: {product?.categories.name}</li>
          </ul>
        </div>
      </div>
      <div className='mt-12'>
        <h1 className='text-2xl font-medium opacity-80 mb-2'>Description</h1>
        <p>{product?.description}</p>
      </div>
    </Drawer>
  );
};

export default EditProduct;
