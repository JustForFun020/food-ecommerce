'use client';

import _ from 'lodash';
import React from 'react';
import { Button, Card, Carousel, Image } from 'antd';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS_QUERY } from '@/lib/graphql/query';
import { Product } from '@/utils/types/product';

const ListProducts = () => {
  const router = useRouter();

  const { loading, data } = useQuery(GET_ALL_PRODUCTS_QUERY, {
    variables: {
      page: 1,
      limit: 10,
    },
  });
  const listProduct: Product[] = _.slice(_.get(data, 'getAllProduct.data', []), 0, 10);

  const handleClickProduct = (name: string) => {
    router.push(`/product/${name}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-6 bg-slate-800'>
      <h1 className='text-5xl font-bold opacity-85 tracking-wide'>Features Food</h1>
      <Carousel className='flex p-6' autoplay>
        {_.map(Array.from([0, 1]), (number) => {
          return (
            <div className='' key={number}>
              <div className='flex w-full items-center justify-between'>
                {_.map(_.slice(listProduct, 5 * number, 5 * number + 5), (product, index) => {
                  return (
                    <Card
                      key={index}
                      className='w-[300px] h-[340px] m-5 border'
                      cover={
                        <Image
                          preview={false}
                          src={product.images[0].imageUrl}
                          alt=''
                          className='w-full'
                          height={200}
                        />
                      }
                      hoverable
                      onClick={() => handleClickProduct(product.name)}
                    >
                      <Card.Meta
                        title={<div className='text-wrap'>{product.name}</div>}
                        className='h-[120px]'
                        description={
                          <div className='leading-6'>
                            <div>Price: {product.price}$</div>
                            <div className='text-right mt-6'></div>
                          </div>
                        }
                      />
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ListProducts;
