import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Cart, CartProducts } from '@/utils/types/cart';
import { Drawer, Button, Input, Form, Divider, Image } from 'antd';
import { useAuththor } from '@/lib/hook/useAuththor';
import { UPDATE_CART_MUTATION } from '@/lib/graphql/mutation';
import { useMutation } from '@apollo/client';
import { GET_ALL_USER_CART } from '@/lib/graphql/query';
import { setBasicInformationCart, setProductQuantity } from '@/lib/redux/cart/reducer';
import { AppDispatch, RootState } from '@/utils/types/redux';
import { connect, ConnectedProps } from 'react-redux';

interface EditCartProps extends PropsFromRedux {
  selectedCart: Cart;
  isVisitableEditCart: boolean;
  setIsVisitableEditCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditCart = (props: EditCartProps) => {
  const [productSelected, setProductSelected] = useState<CartProducts[]>([] as CartProducts[]);
  const [defaultCartInfo, setDefaultCartInfo] = useState({
    name: '',
    topic: '',
    description: '',
  });

  const { selectedCart, isVisitableEditCart, setIsVisitableEditCart } = props;

  useEffect(() => {
    setDefaultCartInfo({
      name: selectedCart.name,
      topic: selectedCart.topic,
      description: selectedCart.description,
    });
  }, [selectedCart]);

  const { currentUser } = useAuththor();

  const [updateCart, { loading }] = useMutation(UPDATE_CART_MUTATION, {
    refetchQueries: [{ query: GET_ALL_USER_CART, variables: { uid: currentUser.id } }],
  });

  const [form] = Form.useForm();
  const { cartProducts: products } = selectedCart;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDefaultCartInfo({ ...defaultCartInfo, [e.target.name]: e.target.value });
  };

  const onProductQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const product = products.find((p) => p.product.name === name) ?? null;
    if (product) {
      setProductSelected((prevState) => {
        const existProduct = prevState.find((p) => p.product.name === name);
        if (existProduct) {
          return _.map(prevState, (p) => {
            if (p.product.name === name) {
              return {
                ...p,
                quantity: parseInt(value),
              };
            }
            return p;
          });
        }
        return [...prevState, { ...product, quantity: parseInt(value) }];
      });
    }
  };

  const handleUpdateCart = () => {
    updateCart({
      variables: {
        updateCartDto: {
          ...defaultCartInfo,
          uid: Number(currentUser.id),
          cid: Number(selectedCart.id),
          cartProducts: _.map(productSelected, (p) => {
            return {
              quantity: p.quantity,
              pid: Number(p.product.id),
              cid: Number(selectedCart.id),
              uid: Number(currentUser.id),
            };
          }),
        },
      },
    });
    setIsVisitableEditCart(false);
  };

  return (
    <Drawer
      title={<div className='text-2xl'>Edit Cart: {selectedCart.name}</div>}
      size='large'
      extra={[
        <Button loading={loading} type='primary' key='edit-cart' onClick={handleUpdateCart}>
          Update
        </Button>,
      ]}
      open={isVisitableEditCart}
      onClose={() => setIsVisitableEditCart(false)}
      footer={[<div className='h-10' key={'space'}></div>]}
    >
      <div>
        <div className='*:leading-8 *:text-lg *:font-medium '>
          <Form
            form={form}
            initialValues={{
              name: selectedCart.name,
              description: selectedCart.description,
              topic: selectedCart.topic,
            }}
            labelAlign='left'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label='Name' name='name'>
              <Input name='name' onChange={onInputChange} />
            </Form.Item>
            <Form.Item label='Description' name='description'>
              <Input.TextArea name='description' onChange={onInputChange} />
            </Form.Item>
            <Form.Item label='Topic' name='topic'>
              <Input name='topic' onChange={onInputChange} />
            </Form.Item>
          </Form>
          <p>Total products: {_.sumBy(products, (p: CartProducts) => p.quantity)}</p>
          <p>Total price: $ {_.sumBy(products, (p: CartProducts) => p.product.price * p.quantity).toFixed(2)}</p>
        </div>
        <div className='mt-4'>
          <h1 className='text-center font-medium text-2xl'>List Products</h1>
          <Divider />
          <ol className='*:odd:mb-4'>
            {_.map(products, (p, index) => {
              const { product } = p;
              return (
                <li key={index}>
                  <div className='grid grid-cols-4 gap-3 *:text-base'>
                    <Image src={product.images[0].imageUrl} alt={product.name} width={100} height={100} />
                    <p>{product.name}</p>
                    <p>$ {product.price}</p>
                    <Input
                      type='number'
                      name={product.name}
                      defaultValue={p.quantity}
                      onChange={onProductQuantityChange}
                      className='h-fit'
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Drawer>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    cartInfo: state.cartReducer.cartInformation,
    cartProducts: state.cartReducer.cartProducts,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setBasicInformationCart: (cartInfo: { name: string; topic: string; description: string }) =>
      dispatch(setBasicInformationCart(cartInfo)),
    setProductQuantity: (product: CartProducts[]) => dispatch(setProductQuantity(product)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(EditCart);
