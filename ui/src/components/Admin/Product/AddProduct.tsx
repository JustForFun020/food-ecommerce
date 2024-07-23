'use client';

import { Button, Form, Input, message, Select, Upload } from 'antd';
import React, { useState } from 'react';
import { Product } from '@/utils/types/product';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT_MUTATION } from '@/lib/graphql/mutation';
import { GET_ALL_PRODUCTS_QUERY } from '@/lib/graphql/query';
import { NameOfProductTag } from '@/utils/enum/product';

const categories = [
  {
    label: 'Vegetables',
    value: 'Vegetables',
  },
  {
    label: 'Fruits',
    value: 'Fruits',
  },
  {
    label: 'Fast Food',
    value: 'Fast Food',
  },
  {
    label: 'Meat',
    value: 'Meat',
  },
  {
    label: 'Seafood',
    value: 'Seafood',
  },
  {
    label: 'Beverages',
    value: 'Beverages',
  },
];

const tags = [
  {
    label: NameOfProductTag.BEST_SELLER,
    value: NameOfProductTag.BEST_SELLER,
  },
  {
    label: NameOfProductTag.FEATURED,
    value: NameOfProductTag.FEATURED,
  },
  {
    label: NameOfProductTag.FRESH,
    value: NameOfProductTag.FRESH,
  },
  {
    label: NameOfProductTag.HOT,
    value: NameOfProductTag.HOT,
  },
  {
    label: NameOfProductTag.LIMITED,
    value: NameOfProductTag.LIMITED,
  },
  {
    label: NameOfProductTag.NEW,
    value: NameOfProductTag.NEW,
  },
  {
    label: NameOfProductTag.SALE,
    value: NameOfProductTag.SALE,
  },
  {
    label: NameOfProductTag.SPECIAL,
    value: NameOfProductTag.SPECIAL,
  },
  {
    label: NameOfProductTag.TOP_RATED,
    value: NameOfProductTag.TOP_RATED,
  },
  {
    label: NameOfProductTag.TRENDING,
    value: NameOfProductTag.TRENDING,
  },
];

interface ProductCategories {
  name: string;
}
interface ProductTags {
  name: string;
}

const AdminAddProduct = () => {
  const [product, setProduct] = useState<Product>({} as Product);
  const [productImage, setProductImage] = useState<any>(null);
  const [productCategories, setProductCategories] = useState<ProductCategories[]>([] as ProductCategories[]);
  const [productTags, setProductTags] = useState<ProductTags[]>([] as ProductTags[]);

  const [form] = Form.useForm();

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION, {
    onCompleted: () => {
      form.resetFields();
      setProductImage(null);
      setProductCategories([]);
      setProductTags([]);
      setProduct({} as Product);
      message.success('Product added successfully');
    },
    onError: (error) => {
      message.error(error.message);
    },
    refetchQueries: [{ query: GET_ALL_PRODUCTS_QUERY, variables: { page: 1, limit: 10000 } }],
  });

  const onFormSubmit = () => {
    createProduct({
      variables: {
        createProduct: {
          name: product.name,
          price: Number(product.price),
          description: product.description,
          categories: productCategories[0],
          amount: Number(product.amount),
          tags: productTags.map((tag) => tag.name),
        },
        uploadImage: {
          image: productImage,
        },
      },
    });
  };

  const handleUploadFile = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'done') {
      setProductImage(info.file.originFileObj);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className='p-10 w-2/3 m-[auto]'>
      <div className='pt-6 pb-6 pl-8 pr-8 border border-slate-500 relative rounded-md'>
        <div className='text-2xl font-bold absolute left-3 top-5'>Foodie!!!</div>
        <div className='text-4xl font-bold text-center'>Add Product</div>
      </div>
      <Form
        form={form}
        className='pt-6 pb-6 pl-8 pr-8 mt-4 rounded-md border border-slate-500'
        labelAlign='left'
        labelCol={{ span: 8 }}
        onFinish={onFormSubmit}
      >
        <Form.Item
          label='Product Name'
          name={'name'}
          rules={[
            {
              required: true,
              message: 'Product Name is required',
            },
          ]}
        >
          <Input placeholder='Product Name' name='name' onChange={onInputChange} value={product.name} />
        </Form.Item>
        <Form.Item
          label='Product Amount'
          name={'amount'}
          rules={[
            {
              required: true,
              message: 'Product Amount is required',
            },
          ]}
        >
          <Input placeholder='Product Amount' name='amount' onChange={onInputChange} value={product.amount} />
        </Form.Item>
        <Form.Item
          label='Product Price'
          name={'price'}
          rules={[
            {
              required: true,
              message: 'Product Price is required',
            },
          ]}
        >
          <Input placeholder='Product Price' name='price' onChange={onInputChange} value={product.price} />
        </Form.Item>
        <Form.Item label='Product Description' name={'description'}>
          <Input.TextArea
            placeholder='Product Description'
            name='description'
            onChange={onInputChange}
            value={product.description}
          />
        </Form.Item>
        <Form.Item label='Image' name={'productImage'}>
          <Upload name='image' onChange={handleUploadFile}>
            <div className='cursor-pointer p-4 border border-dashed bg-[rgba(0,0,0,0.2)]'>
              <UploadOutlined />
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          name='productCategories'
          label='Categories'
          rules={[
            {
              required: true,
              message: 'Please select a category',
            },
          ]}
        >
          <Select
            options={categories}
            onSelect={(value) => {
              setProductCategories([...productCategories, { name: value }]);
            }}
            value={productCategories[0]?.name}
          />
        </Form.Item>
        <Form.Item label='Tags' name={'tags'}>
          <Select
            options={tags}
            mode='tags'
            onSelect={(value) => {
              setProductTags([...productTags, { name: value }]);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button className='float-right' type='primary' htmlType='submit'>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminAddProduct;
