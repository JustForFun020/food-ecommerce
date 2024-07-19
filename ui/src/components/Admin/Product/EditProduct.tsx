import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, Image, Input, message } from 'antd';
import { Product } from '@/utils/types/product';
import { useAppSelector } from '@/lib/hook/useAppSelector';
import { useMutation } from '@apollo/client';
import { UPDATE_PRODUCT_MUTATION } from '@/lib/graphql/mutation';
import { GET_ALL_PRODUCTS_QUERY } from '@/lib/graphql/query';

interface EditProductProps {
  isVisitableDrawer: boolean;
  setIsVisitableDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
}

interface EditProductValue {
  name: string;
  price: number;
  description: string;
}

const EditProduct = ({ product, isVisitableDrawer, setIsVisitableDrawer }: EditProductProps) => {
  const [productDescription, setProductDescription] = useState<string>('');
  const [editProductValue, setEditProductValue] = useState<EditProductValue>({
    name: '',
    price: 0,
    description: '',
  } as EditProductValue);

  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
    onCompleted: () => {
      setIsVisitableDrawer(false);
      form.resetFields();
    },
    onError: (error) => {
      message.error(error.message);
    },
    refetchQueries: [
      {
        query: GET_ALL_PRODUCTS_QUERY,
        variables: {
          page: 1,
          limit: 10,
        },
      },
    ],
  });

  const [form] = Form.useForm();

  useEffect(() => {
    const defaultValue = {
      name: product?.name ?? '',
      price: product?.price ?? '',
    };
    form.setFieldsValue(defaultValue);
    setEditProductValue({
      ...defaultValue,
      description: product?.description ?? '',
    });
  }, [product, form]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditProductValue({ ...editProductValue, [name]: value });
  };

  const handleUpdateProduct = () => {
    updateProduct({
      variables: {
        updateProductDto: {
          id: Number(product.id),
          name: editProductValue.name,
          description: productDescription,
          price: Number(editProductValue.price),
        },
      },
    });
  };
  return (
    <Drawer
      title={`Product: ${product?.name}`}
      zIndex={123142342}
      placement='right'
      closable={true}
      open={isVisitableDrawer}
      onClose={() => {
        setIsVisitableDrawer(false);
        form.resetFields();
      }}
      width={800}
      extra={[
        <Button className='mr-6' key={'delete'} danger>
          Delete
        </Button>,
        <Button key={'update'} type='primary' htmlType='submit' onClick={handleUpdateProduct}>
          Update
        </Button>,
      ]}
    >
      <div className='flex'>
        <Image
          className='w-1/3'
          src={product?.images[0].imageUrl}
          alt={product?.images[0].image}
          width={300}
          height={300}
        />
        <div className='ml-8 w-2/3'>
          <h1 className='text-2xl font-medium opacity-80 mb-2'>Common Information</h1>
          <Form
            form={form}
            initialValues={{
              name: product?.name ?? '',
              price: product?.price ?? '',
            }}
            labelAlign='left'
            labelCol={{ span: 6 }}
          >
            <Form.Item label='Name' name={'name'}>
              <Input name='name' onChange={onInputChange} />
            </Form.Item>
            <Form.Item label='Price' name={'price'}>
              <Input name='price' onChange={onInputChange} />
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className='mt-12'>
        <h1 className='text-2xl font-medium opacity-80 mb-2'>Description</h1>
        <Input.TextArea name='description' onChange={(e) => setProductDescription(e.target.value)} />
      </div>
    </Drawer>
  );
};

export default EditProduct;
