'use client';

import React from 'react';
import { Button, Divider, Drawer, Form, Input, message, Modal, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES_QUERY } from '@/lib/graphql/query';
import { DeleteOutlined } from '@ant-design/icons';
import { Categories } from '@/utils/types/product';
import _ from 'lodash';
import Image from 'next/image';
import {
  DELETE_CATEGORY_MUTATION,
  DELETE_CATEGORY_PRODUCT_MUTATION,
  UPDATE_CATEGORY_MUTATION,
} from '@/lib/graphql/mutation';

const AdminCategories = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Categories>({} as Categories);

  const [form] = Form.useForm();

  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    variables: {
      id: selectedCategory.id,
    },
    onCompleted: () => {
      setIsModalVisible(false);
    },
    refetchQueries: [{ query: GET_ALL_CATEGORIES_QUERY }],
  });
  const [deleteCategoryProduct, { loading: deleteProductLoading }] = useMutation(DELETE_CATEGORY_PRODUCT_MUTATION, {
    refetchQueries: [{ query: GET_ALL_CATEGORIES_QUERY }],
  });
  const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION, {
    refetchQueries: [{ query: GET_ALL_CATEGORIES_QUERY }],
    onCompleted: () => {
      setIsDrawerVisible(false);
      message.success('Category updated successfully');
    },
  });
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES_QUERY);

  const tableDataSource = _.get(data, 'getCategories', []) as Categories[];

  const columns: TableProps<any>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      width: 300,
      render: (src) => {
        return <Image src={src} alt='' width={100} height={100} className='m-auto' />;
      },
    },
    {
      title: 'Total Products',
      dataIndex: 'products',
      key: 'products',
      align: 'center',
      render: (products: any[]) => {
        return products.length;
      },
      sorter: (a, b) => a.products.length - b.products.length,
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      render: (text) => {
        return (
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              deleteCategory();
            }}
          ></Button>
        );
      },
    },
  ];

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

  const renderConfirmDeleteCategory = () => {
    return (
      <Modal
        title={`Delete ${selectedCategory.name}`}
        open={isModalVisible}
        footer={[
          <Button danger key={'delete-category'} onClick={() => deleteCategory()}>
            Delete
          </Button>,
          <Button key={'cancel-delete-category'} type='primary' onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
        ]}
        closable={false}
      >
        <div>
          <p>Are you sure you want to delete {selectedCategory.name}?</p>
        </div>
      </Modal>
    );
  };

  const renderDrawerEditCategory = () => {
    const { products } = selectedCategory;
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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className='flex justify-between p-10 border border-slate-100 rounded-xl mb-10'>
        <div>Some information about categories</div>
        <Button type='primary'>Add Categories</Button>
      </div>
      <Table
        columns={columns}
        dataSource={tableDataSource}
        title={() => <div className='text-center text-4xl opacity-80 tracking-wider font-bold'>Categories</div>}
        loading={loading}
        onRow={(record) => {
          return {
            onClick: () => {
              form.setFieldsValue({
                name: record.name,
                description: record.description,
              });
              setIsDrawerVisible(true);
              setSelectedCategory(record);
            },
          };
        }}
        className='p-10'
      />
      {renderDrawerEditCategory()}
      {renderConfirmDeleteCategory()}
    </div>
  );
};

export default AdminCategories;
