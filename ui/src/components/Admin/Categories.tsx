'use client';

import React, { useState } from 'react';
import { Button, Form, Modal, Table } from 'antd';
import type { TableProps } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES_QUERY } from '@/lib/graphql/query';
import { DeleteOutlined } from '@ant-design/icons';
import { Categories } from '@/utils/types/product';
import _ from 'lodash';
import Image from 'next/image';
import { DELETE_CATEGORY_MUTATION } from '@/lib/graphql/mutation';
import AdminEditCategory from './Categories/EditCategory';

const AdminCategories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Categories>({} as Categories);

  const [form] = Form.useForm();

  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    variables: {
      id: Number(selectedCategory.id),
    },
    onCompleted: () => {
      setIsModalVisible(false);
    },
    refetchQueries: [{ query: GET_ALL_CATEGORIES_QUERY }],
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
        return <Image src={''} alt='' width={100} height={100} className='m-auto' />;
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
    return (
      <AdminEditCategory
        key={'admin-edit-category'}
        selectedCategory={selectedCategory}
        setIsDrawerVisible={setIsDrawerVisible}
        setIsModalVisible={setIsModalVisible}
        isDrawerVisible={isModalVisible}
      />
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className='p-10 border border-slate-100 rounded-xl mb-4 text-right'>
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
