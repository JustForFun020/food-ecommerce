'use client';

import _ from 'lodash';
import React from 'react';
import { Badge, Button, Carousel, Divider, Input, Modal, Rate, Tag, Image } from 'antd';
import { useRouter } from 'next/navigation';
import PageNotFound from '../Error/404';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_CATEGORY_QUERY, GET_PRODUCT_BY_NAME_QUERY } from '@/lib/graphql/query';
import { Product as ProductType } from '@/utils/types/product';
import { GET_RATE_PRODUCT } from '@/lib/graphql/query/_get-rate-product';
import Link from 'next/link';
import { useAddProductToCart } from '@/lib/hook/useAddProductToCart';

const ProductInformation = ({ name }: { name: string }) => {
  const { loading, data } = useQuery(GET_PRODUCT_BY_NAME_QUERY, {
    variables: { name: name },
  });
  const product: ProductType = _.get(data, 'getProductByName', {} as ProductType);

  const { loading: getRelatedLoading, data: getRelatedData } = useQuery(GET_PRODUCT_BY_CATEGORY_QUERY, {
    variables: { category: product?.categories?.name ?? '' },
  });
  const relatedProduct: ProductType[] = _.filter(
    _.get(getRelatedData, 'getProductByCategory', []),
    (p) => p.name !== product.name,
  );

  const { loading: getRateLoading, data: ratesData } = useQuery(GET_RATE_PRODUCT, {
    variables: {
      productName: name,
    },
  });
  const averageRate = _.meanBy(_.get(ratesData, 'getRateByProduct', []), 'score');

  const { addProductToCart } = useAddProductToCart(undefined, product.id, 1, {
    handleCompleted() {
      return Modal.success({
        title: <div className='text-xl'>Add product to cart successfully</div>,
        footer: [
          <div key={'footer'} className='bg-gray-300 p-6 text-center opacity-65 font-bold'>
            Foodie!!!
          </div>,
        ],
        closable: true,
        maskClosable: true,
        content: (
          <div className='mb-8 mt-6'>
            <div className='grid grid-cols-3 gap-2'>
              <Image src={product.images[0].imageUrl} alt='' width={200} height={200} />
              <div className='*:leading-8'>
                <p className='text-3xl font-bold'>{product.name}</p>
                <p>Price: $ {product.price}</p>
              </div>
            </div>
            <div className='text-right'>
              <Link
                href='/order'
                className='pr-4 pl-4 pt-2 pb-2 border border-slate-300 rounded-lg bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.3)] transition-all duration-200'
              >
                Go to cart
              </Link>
            </div>
          </div>
        ),
        width: 800,
      });
    },
    handleError(error) {
      return Modal.error({
        footer: [],
        closable: true,
        maskClosable: true,
        title: 'Add product to cart failed',
        content: (
          <div className='mt-6 mb-6'>
            <p className='text-center font-bold opacity-70 text-xl'>{error?.message}</p>
            <div className='text-right mt-8'>
              <Link
                href='/order'
                className='pr-4 pl-4 pt-2 pb-2 border border-slate-300 rounded-lg bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.3)] transition-all duration-200'
              >
                Go to cart
              </Link>
            </div>
          </div>
        ),
      });
    },
  });

  const router = useRouter();

  if (loading || getRelatedLoading || getRateLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <PageNotFound name='Product' />;
  }

  return (
    <div className='pt-6 pb-6 pr-8 pl-8'>
      <div className='flex mb-8 relative p-4'>
        <div className='mr-6 w-1/2'>
          <Image className='w-full' src={product.images[0].imageUrl} alt={product.name} width={500} height={500} />
        </div>
        <div className='leading-8 w-1/2'>
          <Badge.Ribbon text='taste' placement='start' color='yellow'>
            <p className=' ml-12 text-4xl tracking-wide font-bold'>{product.name}</p>
          </Badge.Ribbon>
          <ul className='flex mt-4'>
            <li>
              <Tag color='blue'>Category</Tag>
            </li>
            <li>
              <Tag color='red'>category</Tag>
            </li>
          </ul>
          <p className='text-lg mt-4 mb-4 opacity-70'>{product.description}</p>
          <p className='text-lg'>Price: {product.price}$</p>
          <p className='text-lg'>Rating: {averageRate ? averageRate.toFixed(2) : 'No rating'}</p>
        </div>
        <Button className='absolute bottom-5 right-5' type='primary' onClick={() => addProductToCart()}>
          Add to cart
        </Button>
      </div>
      <Divider className='bg-slate-400' />
      <div>
        <h1 className='text-3xl font-medium tracking-wide'>Related Products</h1>
        <Carousel autoplay>
          <div>
            <div className='flex items-center justify-start p-6 gap-8'>
              {_.map(_.slice(relatedProduct, 0, 5), (product) => {
                return (
                  <div
                    onClick={() => router.push(`/product/${product.name}`)}
                    key={product.name}
                    className='flex cursor-pointer flex-col items-center justify-center'
                  >
                    <Image
                      preview={false}
                      src={product.images[0].imageUrl}
                      alt={product.name}
                      width={200}
                      height={200}
                    />
                    <div className='mt-2 text-lg font-medium'>{product.name}</div>
                    <div>Price: {product.price}$</div>
                  </div>
                );
              })}
            </div>
          </div>
          {relatedProduct.length > 8 && (
            <div>
              <div className='flex items-center justify-start p-6'>
                {_.map(_.slice(relatedProduct, 5, 10), (product) => {
                  return (
                    <div
                      onClick={() => router.push(`/product/${product.name}`)}
                      key={product.name}
                      className='flex cursor-pointer flex-col items-center justify-center'
                    >
                      <Image src={product.images[0].imageUrl} alt={product.name} width={200} height={200} />
                      <div className='mt-2 text-lg font-medium'>{product.name}</div>
                      <div>Price: {product.price}$</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Carousel>
      </div>
      <Divider className='bg-slate-400' />
    </div>
  );
};

export default ProductInformation;
