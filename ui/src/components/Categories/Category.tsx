'use client';

import _ from 'lodash';
import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Button, Card, Divider, Modal, Select, Tag, Image, Space, message } from 'antd';
import '@/style/categories.css';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_BY_NAME_QUERY } from '@/lib/graphql/query';
import { Categories, Product } from '@/utils/types/product';
import { useAddProductToCart } from '@/lib/hook/useAddProductToCart';

const Category: React.FC<{ category: string }> = ({ category: name }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [product, setProduct] = useState<Product>();
  const [currentCategories, setCurrentCategories] = useState<Categories>({} as Categories);

  const { data, loading, error } = useQuery(GET_CATEGORY_BY_NAME_QUERY, {
    variables: { name },
    onCompleted: (data) => {
      const category = _.get<Categories>(data, 'getCategoryByName', {} as Categories);
      setCurrentCategories(category);
    },
  });
  const { addProductToCart } = useAddProductToCart(undefined, product?.id ?? 0, 1, {
    handleCompleted(res) {
      setIsModalVisible(false);
      message.success('Product added to cart');
    },
    handleError(error) {
      message.error(error?.message ?? '');
    },
  });

  const category = _.get<Categories>(data, 'getCategoryByName', {} as Categories);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    throw new Error('Error: ' + error.message);
  }

  const handleFilterProduct = (value: string) => {
    switch (value) {
      case 'price-low':
        return setCurrentCategories({ ...category, products: _.orderBy(category.products, ['price'], ['asc']) });
      case 'price-high':
        return setCurrentCategories({ ...category, products: _.orderBy(category.products, ['price'], ['desc']) });
      case 'rating-low':
        return setCurrentCategories({ ...category, products: _.orderBy(category.products, ['rating'], ['asc']) });
      case 'rating-high':
        return setCurrentCategories({ ...category, products: _.orderBy(category.products, ['rating'], ['desc']) });
      default:
        return category.products;
    }
  };

  const openProductModal = (product: Product) => {
    return (
      <Modal
        title={
          <div className='mb-8'>
            <p className='text-2xl'>{product?.name}</p>
            <div>
              <Tag color='red'>Best seller</Tag>
              <Tag color='green'>Best seller</Tag>
            </div>
          </div>
        }
        open={isModalVisible}
        footer={[
          <Button key='add--btn' type='primary' onClick={() => addProductToCart()}>
            Add to cart
          </Button>,
        ]}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <div className='flex gap-4'>
          <div>
            <Image src={product?.images[0].imageUrl} alt='' width={150} height={150} className='w-full rounded-lg' />
          </div>
          <div>
            <p>{product?.description}</p>
            <p>Price: {product?.price}</p>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <main>
      <header className='p-6'>
        <Header />
      </header>
      <div className='p-6'>
        <div className='flex category__primary p-12 text-white rounded-lg before:rounded-lg z-auto'>
          <div className='mr-12 z-50'>
            <Image src={currentCategories.image} width={300} alt='' height={300} className='rounded-3xl' />
          </div>
          <div className='z-50'>
            <h1 className='text-6xl tracking-wider font-bold'>{currentCategories.name}</h1>
            <p className='mt-6 mb-6 text-lg font-medium opacity-80'>{currentCategories.description}</p>
            <p>Total Product: {currentCategories.products?.length ?? 0}</p>
          </div>
          <Link
            href='/categories'
            className='absolute z-[21378213] right-8 top-8 p-2 border border-slate-400 bg-[rgba(0,0,0,.3)] hover:bg-[rgba(0,0,0,.6)] rounded-xl transition-all duration-300'
          >
            View all categories
          </Link>
        </div>
        <Divider />
        <div className='gap-4 grid grid-cols-8 mt-8 mb-8'>
          <p className='opacity-70 font-medium'>Filter Product: </p>
          <Select placeholder='Sort by product' onChange={(e) => handleFilterProduct(e)}>
            <Select.Option value='price-low'>Price low to high</Select.Option>
            <Select.Option value='price-high'>Price high to low</Select.Option>
            <Select.Option value='rating-low'>Rating low to high</Select.Option>
            <Select.Option value='rating-high'>Rating high to low</Select.Option>
          </Select>
        </div>
        <Space className='category__products w-full'>
          {_.map(currentCategories.products, (product) => {
            return (
              <Card
                key={product.id}
                onClick={() => {
                  setIsModalVisible(true);
                  setProduct(product);
                }}
                hoverable
                className='w-[200px]'
                cover={<Image preview={false} src={product.images[0].imageUrl} height={150} alt='' />}
              >
                <Card.Meta title={product.name} description={<p>Price: {product.price}</p>} />
              </Card>
            );
          })}
        </Space>
      </div>
      <footer className='p-6 bg-gray-200'>
        <Footer />
      </footer>
      {openProductModal(product as Product)}
    </main>
  );
};

export default Category;
