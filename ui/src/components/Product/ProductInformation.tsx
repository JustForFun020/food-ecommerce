'use client';

import _, { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Carousel, Divider, Input, Modal, Rate, Tag, Image } from 'antd';
import { useRouter } from 'next/navigation';
import PageNotFound from '../Error/404';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_CATEGORY_QUERY, GET_PRODUCT_BY_NAME_QUERY } from '@/lib/graphql/query';
import { Product as ProductType } from '@/utils/types/product';
import Link from 'next/link';
import { useAddProductToCart } from '@/lib/hook/useAddProductToCart';
import { GET_RATE_PRODUCT } from '@/lib/graphql/query/product/getRateProduct';
import { productTagColor } from '@/utils/constance/color';
import { useCustomRouter } from '@/lib/hook/useCustomRouter';
import { useUserCart } from '@/lib/hook/useUserCart';
import AddProductToCart from '../AddProductToCart';

const ProductInformation: React.FC<{ name: string }> = ({ name }) => {
  const { navigateTo } = useCustomRouter();
  const { getUserCart, userCart, setUserCart } = useUserCart();

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

  useEffect(() => {
    getUserCart().then((res) => {
      const userCart = _.get(res.data, 'getAllUserCarts', []);
      setUserCart(userCart);
    });
  }, [getUserCart, setUserCart, userCart]);

  if (loading || getRelatedLoading || getRateLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <PageNotFound name='Product' />;
  }

  return (
    <div className='pt-6 pb-6 pr-8 pl-8'>
      <div className='flex mb-8 relative p-4 gap-10'>
        <div className='mr-6 w-1/3'>
          <Image className='w-full' src={product?.images[0].imageUrl} alt={product.name} width={500} height={500} />
        </div>
        <div className='leading-8 w-2/3 flex flex-col justify-between'>
          <div>
            <div className='w-2/3'>
              <Badge.Ribbon text={product.categories.name} placement='end' color='yellow'>
                <span className='text-4xl tracking-wide font-bold mr-12'>{product.name}</span>
              </Badge.Ribbon>
            </div>
            <ul className='flex mt-4'>
              {_.map(product.tags, (tag) => (
                <li key={tag.id} className='mr-4'>
                  <Tag color={productTagColor[tag.name]}>{tag.name}</Tag>
                </li>
              ))}
            </ul>
            <p className='text-lg mt-4 mb-4 opacity-70'>{product.description}</p>
            <p className='text-lg mb-4'>Price: $ {product.price}</p>
            <p className='text-lg mb-4'>Rating: {averageRate ? averageRate.toFixed(2) : 'No rating'}</p>
          </div>
          <div className='text-right'>
            <AddProductToCart carts={userCart} pid={product.id} />
          </div>
        </div>
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
                    onClick={() => navigateTo(`/product/${product.name}`)}
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
                      onClick={() => navigateTo(`/product/${product.name}`)}
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
