'use client';

import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import Header from '../Header';
import '@/style/order.css';
import Link from 'next/link';
import { Button, FloatButton, Layout, message, Tag } from 'antd';
import { CheckOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USER_CART } from '@/lib/graphql/query';
import { useAuththor } from '@/lib/hook/useAuththor';
import { DELETE_CART_MUTATION, DELETE_PRODUCT_FROM_CART_MUTATION } from '@/lib/graphql/mutation';
import { Cart, CartProducts } from '@/utils/types/cart';
import EditCart from './EditCart';
import CreateCart from './CreateCart';
import { AppDispatch, RootState } from '@/utils/types/redux';
import { setCartCheckout } from '@/lib/redux/cart/reducer';
import { connect, ConnectedProps } from 'react-redux';
import { useCustomRouter } from '@/lib/hook/useCustomRouter';
import EmptyCart from './EmptyCart';

interface OrderProps extends PropsFromRedux {}

const Order: React.FC<OrderProps> = ({ setCartCheckout }) => {
  const [isVisitableEditCart, setIsVisitableEditCart] = useState(false);
  const [isVisitableCreateCart, setIsVisitableCreateCart] = useState(false);
  const [selectedCart, setSelectedCart] = useState<Cart>({} as Cart);

  const { currentUser, error: unAuthorError } = useAuththor();
  const { navigateTo } = useCustomRouter();

  const { loading, data: getAllUserCarts } = useQuery(GET_ALL_USER_CART, {
    variables: {
      uid: Number(currentUser?.id),
    },
  });
  const [deleteCart, { loading: deleteCartLoading }] = useMutation(DELETE_CART_MUTATION, {
    refetchQueries: [{ query: GET_ALL_USER_CART, variables: { uid: Number(currentUser?.id) } }],
  });
  const [deleteProductFromCart, { loading: deleteProductLoading, data }] = useMutation(
    DELETE_PRODUCT_FROM_CART_MUTATION,
    {
      refetchQueries: [{ query: GET_ALL_USER_CART, variables: { uid: Number(currentUser?.id) } }],
      onCompleted: () => {
        message.success('Product deleted successfully');
      },
      onError: (error) => {
        message.error(error.message);
      },
    },
  );

  const carts = _.get<Cart[]>(getAllUserCarts, 'getAllUserCarts', []);

  const handleVisitCartModel = (cart: Cart, setVisitableModel: React.Dispatch<React.SetStateAction<boolean>>) => {
    setSelectedCart(cart);
    setVisitableModel(true);
  };

  const handleDeleteCart = (cid: number) => {
    deleteCart({
      variables: {
        cid: Number(cid),
      },
    });
  };

  const handleDeleteProduct = (pid: number, cid: number) => {
    deleteProductFromCart({
      variables: {
        pid: Number(pid),
        cid: Number(cid),
      },
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main>
      <header className='pr-8 pl-6 pt-6 pb-6'>
        <Header />
      </header>
      <FloatButton
        icon={<PlusCircleOutlined />}
        type='primary'
        tooltip='Create Cart'
        onClick={() => setIsVisitableCreateCart(true)}
      />
      <div
        className={`
        ${_.isEmpty(carts) && 'order__content'} min-h-screen w-full mt-6 pr-20 pl-20
        `}
      >
        {_.isEmpty(carts) ? (
          <EmptyCart />
        ) : (
          <Fragment>
            {_.map(carts, (cart, index) => {
              const { cartProducts: products } = cart;
              const total = _.sumBy(products, (product: any) => product.product.price * product.quantity).toFixed(2);
              return (
                <Layout key={cart.id} className='mb-24 shadow-lg'>
                  <Layout.Header className='bg-white border-b-2 border-slate-200 flex items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='text-2xl font-bold tracking-wide mr-20'>{cart.name}</div>
                      <Tag color='blue'>{cart.topic}</Tag>
                    </div>
                    <div>
                      <Button
                        icon={<DeleteOutlined />}
                        danger
                        className='mr-8'
                        loading={deleteCartLoading}
                        onClick={() => handleDeleteCart(cart.id)}
                      >
                        Delete Cart
                      </Button>
                      <Button
                        icon={<CheckOutlined />}
                        type='primary'
                        onClick={() => {
                          setCartCheckout(cart.cartProducts);
                          navigateTo(`/order/payment?price=${total}`);
                        }}
                      >
                        Checkout
                      </Button>
                      <Button
                        icon={<EditOutlined />}
                        className='ml-8'
                        onClick={() => handleVisitCartModel(cart, setIsVisitableEditCart)}
                      />
                    </div>
                  </Layout.Header>
                  <Layout.Content className='bg-white h-[400px] overflow-hidden p-8'>
                    <div className=''>
                      <div className='pr-6 pl-6 grid grid-cols-4 text-center text-2xl font-medium opacity-90 pb-6 border-b border-sky-500 *:text-sky-500'>
                        <p className='w-1/4'>Name</p>
                        <p className=''>Price</p>
                        <p className=''>Quantity</p>
                        <p className=''>Action</p>
                      </div>
                      <div className='h-[300px] overflow-auto pr-6 pl-6'>
                        {_.map(products, (p, index) => {
                          const { product } = p;
                          return (
                            <div key={index} className='mt-8 w-full text-center'>
                              <div className='w-full grid grid-cols-4 mb-8'>
                                <div className='text-lg'>{product.name}</div>
                                <div className=' text-lg'>$ {product.price}</div>
                                <div className=' text-lg'>{p.quantity}</div>
                                <div>
                                  <Button
                                    icon={<DeleteOutlined />}
                                    danger
                                    onClick={() => handleDeleteProduct(product.id, cart.id)}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Layout.Content>
                  <Layout.Footer className='bg-green-300'>
                    <div className='flex items-center justify-between p-4'>
                      <h1 className='text-lg'>Total</h1>
                      <h1 className='text-lg font-bold'>$ {total}</h1>
                    </div>
                  </Layout.Footer>
                </Layout>
              );
            })}
          </Fragment>
        )}
      </div>
      <EditCart
        isVisitableEditCart={isVisitableEditCart}
        setIsVisitableEditCart={setIsVisitableEditCart}
        selectedCart={selectedCart}
      />
      <CreateCart
        isVisitableCreateCart={isVisitableCreateCart}
        setIsVisitableCreateCart={setIsVisitableCreateCart}
        uid={Number(currentUser.id)}
      />
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setCartCheckout: (cart: CartProducts[]) => dispatch(setCartCheckout(cart)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Order);
