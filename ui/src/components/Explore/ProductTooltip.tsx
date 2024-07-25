import { useAddProductToCart } from '@/lib/hook/useAddProductToCart';
import { useUserCart } from '@/lib/hook/useUserCart';
import { Cart } from '@/utils/types/cart';
import { Product } from '@/utils/types/product';
import { Card, Tooltip, Image, Avatar, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import AddProductToCart from '../AddProductToCart';

interface ProductTooltipProps {
  product: Product;
  children: React.ReactNode;
}

const ProductTooltip: React.FC<ProductTooltipProps> = ({ product, children }) => {
  const { userCart } = useUserCart();

  const customTooltipTitle = () => {
    return (
      <div className='*:leading-10 w-full overflow-hidden'>
        <p className='font-bold w-[250px] text-xl mb-3'>{product.name}</p>
        <div className='flex gap-4 items-start'>
          <Avatar src={product.images[0].imageUrl} size={100} />
          <div>
            <p>
              <span className='font-bold w-full opacity-80'>Price: </span>$ {product.price}
            </p>
            <p>
              <span className='font-bold w-full opacity-80'>Rating: </span>0
            </p>
            <p>
              <span className='font-bold w-full opacity-80'>Category: </span>
              {product.categories.name}
            </p>
          </div>
        </div>
        <div className='text-right mt-4 mb-4 w-full pr-2'>
          <AddProductToCart carts={userCart} pid={product.id} />
        </div>
      </div>
    );
  };

  return (
    <Tooltip key={product.name} title={customTooltipTitle} className='w-[380px]'>
      {children}
    </Tooltip>
  );
};

export default ProductTooltip;
