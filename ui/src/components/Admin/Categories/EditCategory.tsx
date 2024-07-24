import { DELETE_CATEGORY_PRODUCT_MUTATION, UPDATE_CATEGORY_MUTATION } from '@/lib/graphql/mutation';
import { GET_ALL_CATEGORIES_QUERY } from '@/lib/graphql/query';
import { Categories } from '@/utils/types/product';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button, Divider, Drawer, Form, Input, message, Space } from 'antd';
import _ from 'lodash';
import React from 'react';

interface EditCategoryProps {
  selectedCategory: Categories;
  isDrawerVisible: boolean;
  setIsDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminEditCategory: React.FC<EditCategoryProps> = ({
  selectedCategory,
  isDrawerVisible,
  setIsDrawerVisible,
  setIsModalVisible,
}) => {
  const [form] = Form.useForm();

  const { products } = selectedCategory;

  const [deleteCategoryProduct, { loading: deleteProductLoading }] = useMutation(DELETE_CATEGORY_PRODUCT_MUTATION, {
    refetchQueries: [{ query: GET_ALL_CATEGORIES_QUERY }],
    onCompleted: () => {
      message.success('Product deleted successfully');
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
  const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION, {
    refetchQueries: [{ query: GET_ALL_CATEGORIES_QUERY }],
    onCompleted: () => {
      setIsDrawerVisible(false);
      message.success('Category updated successfully');
    },
  });

  const handleUpdateCategory = (values: { name: string; description: string }) => {
    updateCategory({
      variables: {
        updateCategoryDto: {
          id: Number(selectedCategory.id),
          name: values.name,
          description: values.description,
        },
      },
    });
  };

  const handleDeleteProductCategory = (categoryId: number, productId: number) => {
    deleteCategoryProduct({
      variables: {
        categoryId,
        productId,
      },
    });
  };

  return (
    <Drawer
      title={`Edit ${selectedCategory.name}`}
      open={isDrawerVisible}
      onClose={() => setIsDrawerVisible(false)}
      size='large'
      extra={[
        <Button key={'open-confirm'} danger onClick={() => setIsModalVisible(true)}>
          Delete
        </Button>,
      ]}
      footer={[
        <div key={'footer'} className='mt-6 text-lg opacity-65 text-center p-10'>
          @JustForFun
        </div>,
      ]}
    >
      <Form form={form} labelAlign='left' labelCol={{ span: 8 }} onFinish={handleUpdateCategory}>
        <Form.Item name={'name'} label='Category Name'>
          <Input />
        </Form.Item>
        <Form.Item name={'description'} label='Category Description'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item className='text-right'>
          <Button key={'update-category'} type='primary' htmlType='submit'>
            Update
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Space direction='vertical' className='w-full' size='large'>
        {_.map(products, (product) => {
          return (
            <div className='grid grid-cols-4 gap-10 p-6 border border-slate-200 rounded-lg *:text-center'>
              <p>ID: {product.id}</p>
              <p>{product.name}</p>
              <p>$ {product.price}</p>
              <p>
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDeleteProductCategory(selectedCategory.id, product.id)}
                ></Button>
              </p>
            </div>
          );
        })}
      </Space>
    </Drawer>
  );
};

export default AdminEditCategory;
