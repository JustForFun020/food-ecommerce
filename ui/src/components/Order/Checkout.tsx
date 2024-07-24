import _ from 'lodash';
import { Modal, Button, message } from 'antd';
import React from 'react';
import { Cart, CartProducts } from '@/utils/types/cart';
import { useMutation } from '@apollo/client';
import { CREATE_INVOICE_MUTATION } from '@/lib/graphql/mutation';
import { useAuththor } from '@/lib/hook/useAuththor';

interface CheckoutProps {
  selectedCart: Cart;
  setIsVisitableCheckout: React.Dispatch<React.SetStateAction<boolean>>;
  isVisitableCheckout: boolean;
}

const Checkout: React.FC<CheckoutProps> = ({ selectedCart, setIsVisitableCheckout, isVisitableCheckout }) => {
  const { cartProducts: products } = selectedCart;
  const { currentUser } = useAuththor();

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
          userId: Number(currentUser?.id),
          price: totalPrice,
          name: `Invoice ${selectedCart.name}`,
          pid: _.map(products, (p: CartProducts) => Number(p.product.id)),
        },
      },
    });
  };

  return (
    <Modal
      title={<div className='text-center mb-4 tracking-wide text-2xl'>Checkout: {selectedCart.name} Cart</div>}
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
      <div className='*:leading-8 *:text-lg *:mb-4 *:pb-2 *:border-b *:border-b-slate-200'>
        <p className='flex justify-between *:font-medium'>
          <span>Total Product:</span> <span className='opacity-75'>{_.sumBy(products, (p: any) => p.quantity)}</span>{' '}
        </p>
        <p className='flex justify-between *:font-medium'>
          <span>Total Price:</span>{' '}
          <span className='opacity-75'>$ {_.sumBy(products, (p: any) => p.product.price * p.quantity).toFixed(2)}</span>
        </p>
        <p className='flex justify-between *:font-medium'>
          <span>Topic:</span> <span className='opacity-75'>{selectedCart.topic}</span>
        </p>
        <p className='flex justify-between *:font-medium'>
          <span>Discount</span> <i className='opacity-75'>Comming soon!!!</i>
        </p>
      </div>
    </Modal>
  );
};

export default Checkout;
