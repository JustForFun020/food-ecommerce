import React, { Fragment, useRef } from 'react';
import { Cart } from '@/utils/types/cart';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useAddProductToCart } from '@/lib/hook/useAddProductToCart';
import _ from 'lodash';

interface SelectCartProps {
  carts: Cart[];
  pid: number;
}

const AddProductToCart: React.FC<SelectCartProps> = ({ carts, pid }) => {
  const { handleAddProductToCart } = useAddProductToCart();

  const menuItem: MenuProps['items'] = carts.map((cart) => ({
    key: cart.id,
    value: cart.id,
    label: cart.name,
  }));

  const handleAddToCart: MenuProps['onClick'] = ({ key }) => {
    handleAddProductToCart(Number(key), Number(pid), 1);
  };

  const renderSelectCart = () => {
    return (
      <Dropdown
        menu={{ items: menuItem, onClick: handleAddToCart }}
        className='text-right w-[200px]'
        trigger={['hover']}
      >
        <Button className='w-[150px]' type='primary'>
          Add To Cart
        </Button>
      </Dropdown>
    );
  };

  return (
    <Fragment>
      {_.isEmpty(carts) ? (
        <Button onClick={() => handleAddProductToCart(undefined, Number(pid), 1)} type='primary' className='w-[150px]'>
          Add To Cart
        </Button>
      ) : (
        renderSelectCart()
      )}
    </Fragment>
  );
};

export default AddProductToCart;
