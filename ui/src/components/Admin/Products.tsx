'use client';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Drawer, Image, message, Table } from 'antd';
import type { TableProps } from 'antd';
import { useRouter } from 'next/navigation';
import AdminCategories from './Categories';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS_QUERY } from '@/lib/graphql/query';
import { Categories, Product, ProductImage } from '@/utils/types/product';
import { revalidatePath } from 'next/cache';

const AdminProducts = () => {
  const [isVisitableDrawer, setIsVisitableDrawer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoriesUpdate, setCategoriesUpdate] = useState<Categories>({} as Categories);

  const router = useRouter();

  const { loading, data } = useQuery(GET_ALL_PRODUCTS_QUERY, {
    onError: (error) => {
      message.error(error.message);
    },
    variables: {
      page: 1,
      limit: 10000,
    },
  });

  const res = _.get(data, 'getAllProduct.data', []);
  const products = _.map(res, (product: Product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.categories,
      images: product.images,
    };
  });

  const columns: TableProps<any>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        return <div>{category.name}</div>;
      },
    },
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (image: ProductImage[]) => {
        return <Image src={image[0]?.imageUrl ?? ''} alt={image[0]?.image ?? ''} width={50} height={50} />;
      },
    },
  ];

  const openProductDrawer = (product: Product) => {
    return (
      <Drawer
        title={`Product: ${product.name}`}
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
            src={product.images[0].imageUrl}
            alt={product.images[0].image}
            width={300}
            height={300}
          />
          <div className='ml-8 w-2/3'>
            <h1 className='text-2xl font-medium opacity-80 mb-2'>Common Information</h1>
            <ul className='*:leading-7'>
              <li>ID: {product.id}</li>
              <li>Name: {product.name}</li>
              <li>Price: ${product.price}</li>
              <li>Category: {product.categories.name}</li>
            </ul>
          </div>
        </div>
        <div className='mt-12'>
          <h1 className='text-2xl font-medium opacity-80 mb-2'>Description</h1>
          <p>{product.description}</p>
        </div>
      </Drawer>
    );
  };

  return (
    <div>
      <div className='pl-2 pr-2 pt-10 pb-10'>
        <div className='flex justify-between p-10 border border-slate-100 rounded-xl mb-10'>
          <div>
            <h1 className='text-2xl font-medium opacity-80 mb-2'>Common Information</h1>
            <ul className='*:leading-7'>
              <li>Total Product: 12312</li>
              <li>Total Stock: 2312</li>
              <li>Total Price: $12321312</li>
            </ul>
          </div>
          <div>
            <Button
              type='primary'
              onClick={() => {
                router.push('/admin/products/add-product');
              }}
            >
              Add Product
            </Button>
          </div>
        </div>
        <Table
          className='h-full'
          footer={() => <div className='text-center opacity-80 font-medium'>Coppyright by JusForFun</div>}
          title={() => <div className='text-center text-4xl opacity-80 tracking-wider font-bold'>List Product</div>}
          columns={columns}
          dataSource={products}
          loading={loading}
          onRow={(record) => {
            return {
              onClick: () => {
                setSelectedProduct(_.find(res, { id: record.id }));
                setIsVisitableDrawer(true);
              },
            };
          }}
        />
      </div>
      {isVisitableDrawer && selectedProduct && openProductDrawer(selectedProduct)}
    </div>
  );
};

export default AdminProducts;
