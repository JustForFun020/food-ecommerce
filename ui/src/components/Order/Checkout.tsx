import _ from 'lodash';
import { Modal, Button } from 'antd';
import React from 'react';
import { Cart } from '@/utils/types/cart';

interface CheckoutProps {
  selectedCart: Cart;
  setIsVisitableCheckout: React.Dispatch<React.SetStateAction<boolean>>;
  isVisitableCheckout: boolean;
}

const Checkout = ({ selectedCart, setIsVisitableCheckout, isVisitableCheckout }: CheckoutProps) => {
  const { cartProducts: products } = selectedCart;
  return (
    <Modal
      title={<div>Cart {selectedCart.name} checkout</div>}
      closable={false}
      footer={[
        <Button key={'confirm-checkout'} type='primary'>
          Confirm
        </Button>,
        <Button key={'cancel-checkout'} onClick={() => setIsVisitableCheckout(false)}>
          Cancel
        </Button>,
      ]}
      open={isVisitableCheckout}
      onClose={() => setIsVisitableCheckout(false)}
    >
      <div>
        <p>Total Product: {_.sumBy(products, (p: any) => p.quantity)} </p>
        <p>Total Price: $ {_.sumBy(products, (p: any) => p.product.price * p.quantity).toFixed(2)}</p>
        <p>Topic: {selectedCart.topic}</p>
        <p>Discount: You have not applied any discount code.</p>
      </div>
    </Modal>
  );
};

export default Checkout;
