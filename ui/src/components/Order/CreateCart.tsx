import { requiredField } from '@/utils/formValidate';
import { Product } from '@/utils/types/product';
import { Button, Drawer, Form, Input, message, Select } from 'antd';
import React, { Fragment, useState } from 'react';
import SearchModal from '../SearchModal';
import _ from 'lodash';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { CREATE_CART_MUTATION } from '@/lib/graphql/mutation';
import { GET_ALL_USER_CART } from '@/lib/graphql/query';

interface CreateCartProps {
  isVisitableCreateCart: boolean;
  setIsVisitableCreateCart: React.Dispatch<React.SetStateAction<boolean>>;
  uid: number;
}

const CreateCart: React.FC<CreateCartProps> = ({ isVisitableCreateCart, setIsVisitableCreateCart, uid }) => {
  const [isVisitableSearchProduct, setIsVisitableSearchProduct] = useState(false);
  const [listProductSelected, setListProductSelected] = useState<Product[]>([] as Product[]);

  const [createCart] = useMutation(CREATE_CART_MUTATION, {
    onCompleted: () => {
      message.success('Create cart successfully');
      form.resetFields();
      setListProductSelected([]);
      setIsVisitableCreateCart(false);
    },
    onError: (error) => {
      message.error(error.message);
    },
    refetchQueries: [{ query: GET_ALL_USER_CART, variables: { uid } }],
  });

  const [form] = Form.useForm();

  const handleClickProduct = (product: Product) => {
    setListProductSelected((prevState) => {
      const isExist = _.find(prevState, (item) => item.id === product.id);
      if (!isExist) {
        return [...prevState, product];
      }
      return prevState;
    });
    setIsVisitableSearchProduct(false);
  };

  const handleRemoveProduct = (product: Product) => {
    setListProductSelected((prevState) => {
      return _.filter(prevState, (item) => item.id !== product.id);
    });
  };

  const handleCreateCart = (values: any) => {
    createCart({
      variables: {
        createCartDto: {
          uid,
          name: values.name,
          description: values.description,
          topic: values.topic,
          pid: _.map(listProductSelected, (product) => Number(product.id)),
        },
      },
    });
  };

  return (
    <Drawer
      title={<div className='text-center text-2xl font-medium tracking-wide'>Create Cart</div>}
      open={isVisitableCreateCart}
      extra={[
        <Button key='cancel-create-cart-btn' onClick={() => setIsVisitableCreateCart(false)}>
          Cancel
        </Button>,
      ]}
      closable={false}
      onClose={() => setIsVisitableCreateCart(false)}
      footer={[
        <div key='footer-create-cart' className='p-4 text-xl opacity-80 font-medium text-center'>
          @JustForFun
        </div>,
      ]}
      size='large'
    >
      <Form form={form} labelAlign='left' labelCol={{ span: 5 }} onFinish={handleCreateCart}>
        <Form.Item label='Name' name='name' rules={requiredField('cart name')}>
          <Input />
        </Form.Item>
        <Form.Item label='Topic' name='topic' rules={requiredField('cart topic')}>
          <Input placeholder='Ex: Lunch, Breakfast, Party,...' />
        </Form.Item>
        <Form.Item label='Description' name='description'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label='Search product' name={'selectedProduct'}>
          <Input placeholder='Select Product' onClick={() => setIsVisitableSearchProduct(true)} />
          {!_.isEmpty(listProductSelected) && (
            <Fragment>
              {_.map(listProductSelected, (product, index) => {
                return (
                  <div className='flex items-center justify-between pt-4 pb-4 mb-1 mt-1'>
                    <div>{product.name}</div>
                    <div>$ {product.price}</div>
                    <Button onClick={() => handleRemoveProduct(product)} icon={<DeleteOutlined />} danger />
                  </div>
                );
              })}
            </Fragment>
          )}
        </Form.Item>
        <Form.Item className='text-right'>
          <Button htmlType='submit' type='primary'>
            Create Cart
          </Button>
        </Form.Item>
      </Form>
      <SearchModal
        isListSearchVisible={isVisitableSearchProduct}
        setListSearchVisible={setIsVisitableSearchProduct}
        handleClickProduct={handleClickProduct}
      />
    </Drawer>
  );
};

export default CreateCart;
