'use client';

import { Button, Table } from 'antd';
import React from 'react';
import type { TableProps } from 'antd';

const AdminCategories = () => {
  const columns: TableProps<any>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <div>
      <div className='flex justify-between p-10 border border-slate-100 rounded-xl mb-10'>
        <div>Some information about categories</div>
        <Button type='primary'>Add Categories</Button>
      </div>
      <Table
        columns={columns}
        dataSource={[]}
        title={() => <div className='text-center text-4xl opacity-80 tracking-wider font-bold'>Categories</div>}
      />
    </div>
  );
};

export default AdminCategories;
