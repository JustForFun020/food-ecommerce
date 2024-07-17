'use client';

import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { fakeProduct } from '../../../__mocks__/product';
import { Button, Card, Divider, Image, Pagination, Select, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS_QUERY, GET_PRODUCT_BY_CATEGORY_QUERY } from '@/lib/graphql/query';
import { Product } from '@/utils/types/product';
import { NameOfCategories } from '@/utils/enum/categories';
import ProductTooltip from './ProductTooltip';

const Explore = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [categorySelected, setCategorySelected] = useState<string>('');

  const router = useRouter();

  const productsPerPage = 10;
  const [getProduct, { loading, data }] = useLazyQuery(GET_ALL_PRODUCTS_QUERY, {
    onCompleted: (data) => {
      setListProducts(data.getAllProduct.data);
    },
  });

  const [getProductByCategory, { loading: getByCategoryLoading }] = useLazyQuery(GET_PRODUCT_BY_CATEGORY_QUERY, {
    onCompleted: (data) => {
      setListProducts(data.getProductByCategory);
    },
  });

  useEffect(() => {
    getProduct({
      variables: {
        page: 1,
        limit: productsPerPage,
      },
    });
  }, [getProduct]);

  const totalPage = _.get(data, 'getAllProduct.total', 0);

  const handleFilterByCategory = (category: string) => {
    setCategorySelected(category);
    setIsFiltering(true);
    getProductByCategory({
      variables: {
        category,
      },
    });
  };

  const handleDisableFilter = () => {
    setIsFiltering(false);
    setCurrentPage(1);
    setCategorySelected('');
    getProduct({
      variables: {
        page: 1,
        limit: productsPerPage,
      },
    });
  };

  return (
    <main>
      <header className='pt-6 pb-6 pr-12 pl-12'>
        <Header />
      </header>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          <div className='min-h-screen relative'>
            <div className='mb-4 *:leading-10'>
              <h1 className='text-4xl font-bold text-center'>Explore</h1>
              <p className='text-center text-lg font-medium opacity-65'>Find your favorite food</p>
            </div>
            <Divider />
            <div className='ml-12 flex'>
              <div>
                <span>Select Category: </span>
                <Select
                  options={_.map(NameOfCategories, (category) => {
                    return { label: category, value: category };
                  })}
                  value={categorySelected}
                  placeholder='Select category'
                  className='w-[200px] mr-8'
                  onSelect={(value) => handleFilterByCategory(value)}
                />
              </div>
              <Button
                type='primary'
                disabled={!isFiltering}
                onClick={handleDisableFilter}
                loading={getByCategoryLoading}
              >
                Clear
              </Button>
            </div>
            <Divider />
            <div className='flex items-center justify-center pt-8 pb-20 pr-12 pl-12 flex-wrap gap-14'>
              {_.map(listProducts, (product, index) => {
                return (
                  <ProductTooltip product={product} key={index}>
                    <Card
                      cover={
                        <Image
                          alt=''
                          src={product.images[0].imageUrl}
                          className='w-full'
                          preview={false}
                          height={200}
                          key={index}
                          style={{
                            width: '100%',
                          }}
                        />
                      }
                      className='w-[200px] shadow-sm'
                      hoverable
                      onClick={() => router.push(`/product/${product.name}`)}
                    >
                      <Card.Meta title={product.name} description={<span>Price: $ {product.price}</span>} />
                    </Card>
                  </ProductTooltip>
                );
              })}
            </div>
            <Pagination
              defaultCurrent={1}
              total={totalPage}
              pageSize={productsPerPage}
              current={currentPage}
              onChange={(page) => {
                setCurrentPage(page);
                getProduct({
                  variables: {
                    page,
                    limit: productsPerPage,
                  },
                });
              }}
              className={`${!isFiltering ? 'block' : 'hidden'} absolute bottom-0 right-0 p-6`}
            />
          </div>
        </Fragment>
      )}
      <footer className='p-6 bg-gray-200'>
        <Footer />
      </footer>
    </main>
  );
};

export default Explore;
