import { useAddProductToCart } from '@/lib/hook/useAddProductToCart';
import { Cart } from '@/utils/types/cart';
import { Product } from '@/utils/types/product';
import { Card, Tooltip, Image, Avatar, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ProductTooltipProps {
  product: Product;
  children: React.ReactNode;
}

const ProductTooltip: React.FC<ProductTooltipProps> = ({ product, children }) => {
  const { addProductToCart } = useAddProductToCart(undefined, product.id, 1, {
    handleCompleted(res) {
      message.success('Add product to cart successfully');
    },
    handleError(error) {
      message.error(error?.message || 'Add product to cart failed');
    },
  });

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
          <Button
            className='border pr-2 pl-4 border-slate-300 rounded-lg hover:bg-slate-700 transition-all duration-200'
            onClick={() => addProductToCart()}
          >
            Add To Cart
          </Button>
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
