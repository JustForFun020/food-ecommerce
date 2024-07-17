import _ from 'lodash';
import { Modal, Button, message } from 'antd';
import React from 'react';
import { Cart, CartProducts } from '@/utils/types/cart';
import { useMutation } from '@apollo/client';
import { CREATE_INVOICE_MUTATION } from '@/lib/graphql/mutation';

interface CheckoutProps {
  selectedCart: Cart;
  setIsVisitableCheckout: React.Dispatch<React.SetStateAction<boolean>>;
  isVisitableCheckout: boolean;
}

const Checkout = ({ selectedCart, setIsVisitableCheckout, isVisitableCheckout }: CheckoutProps) => {
  const { cartProducts: products } = selectedCart;

  const [createInvoice, { loading: createInvoiceLoading }] = useMutation(CREATE_INVOICE_MUTATION, {
    onCompleted: () => {
      message.success('Checkout successfully. Please wait your order is being processed.');
      setIsVisitableCheckout(false);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handleCheckout = () => {
    const totalPrice = _.sumBy(products, (p: CartProducts) => p.quantity * p.product.price);
    createInvoice({
      variables: {
        createInvoiceDto: {
          cartId: Number(selectedCart.id),
          price: totalPrice,
          name: `Invoice ${selectedCart.name}`,
        },
      },
    });
  };

  return (
    <Modal
      title={<div>Cart {selectedCart.name} checkout</div>}
      closable={false}
      footer={[
        <Button key={'confirm-checkout'} type='primary' onClick={() => handleCheckout()} loading={createInvoiceLoading}>
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
