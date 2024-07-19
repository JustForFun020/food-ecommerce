'use client';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Image, message, Table } from 'antd';
import type { TableProps } from 'antd';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS_QUERY } from '@/lib/graphql/query';
import { Product, ProductImage } from '@/utils/types/product';
import EditProduct from './Product/EditProduct';
import { useRefreshTable } from '@/lib/hook/useRefreshTable';

const AdminProducts = () => {
  const [isVisitableDrawer, setIsVisitableDrawer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { refreshData } = useRefreshTable(GET_ALL_PRODUCTS_QUERY, {
    variables: {
      page: 1,
      limit: 10000,
    },
  });

  const router = useRouter();

  const { loading, data } = useQuery(GET_ALL_PRODUCTS_QUERY, {
    onError: (error) => {
      message.error(error.message);
    },
    variables: {
      page: 1,
      limit: 10000,
    },
    fetchPolicy: 'cache-and-network',
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
        return <div>{category?.name}</div>;
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
      <EditProduct
        product={product}
        isVisitableDrawer={isVisitableDrawer}
        setIsVisitableDrawer={setIsVisitableDrawer}
      />
    );
  };

  return (
    <div>
      <div className='pl-2 pr-2 pt-10 pb-10'>
        <div className='flex justify-between p-10 border border-slate-100 rounded-xl mb-10'>
          <div>
            <h1 className='text-2xl font-medium opacity-80 mb-2'>Common Information</h1>
            <ul className='*:leading-7 *:text-lg'>
              <li>Total Product: {products?.length ?? 0}</li>
              <li>Total Price: $ {_.sumBy(products, 'price')}</li>
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
          footer={() => <div className='text-center opacity-80 font-medium'>Coppyright by @JusForFun</div>}
          title={() => (
            <div className='relative'>
              <div className='text-center text-4xl opacity-80 tracking-wider font-bold'>List Product</div>
              <Button className='absolute top-2 right-3' type='primary' onClick={() => refreshData()}>
                Refresh
              </Button>
            </div>
          )}
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
      {openProductDrawer(selectedProduct as Product)}
    </div>
  );
};

export default AdminProducts;
