'use client';

import React, { useCallback, useState } from 'react';
import { GET_ALL_INVOICE_QUERY } from '@/lib/graphql/query';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Button, Table, Tag, type TableProps } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { useRefreshTable } from '@/lib/hook/useRefreshTable';
import UpdateInvoice from '../Invoice/UpdateInvoice';
import { Invoice } from '@/utils/types/cart';

const AdminOrders = () => {
  const [isVisitableDrawerUpdate, setIsVisitableDrawerUpdate] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>({} as Invoice);

  const { loading, data } = useQuery(GET_ALL_INVOICE_QUERY);
  const { refreshData, loading: refreshLoading } = useRefreshTable(GET_ALL_INVOICE_QUERY);

  const handleRefreshData = useCallback(() => {
    refreshData();
  }, [refreshData]);

  const listInvoice = _.get(data, 'getAllInvoice', []);
  const dataSource = _.map(listInvoice, (invoice) => ({
    id: invoice.id,
    name: invoice.name,
    price: invoice.price,
    status: invoice.status,
    createdAt: invoice.createdAt,
    userId: _.get(invoice, 'user.id', ''),
  }));

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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => {
        return <span>$ {price}</span>;
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'Pending' ? 'orange' : 'green';
        return <Tag color={color}>{status}</Tag>;
      },
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'Confirmed', value: 'Confirmed' },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => {
        return <span>{moment(date).format('HH:mm DD/MM/YYYY')}</span>;
      },
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <main className='p-10'>
      <div className='mb-10'>
        <p className='text-lg font-medium'>
          Revenue: ${' '}
          {_.reduce(
            listInvoice,
            (acc, curr) => {
              return acc + curr.price;
            },
            0,
          )}
        </p>
        <p></p>
      </div>
      <Table
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectedInvoice({
                ...record,
                products: _.get(_.find(listInvoice, { id: record.id }), 'products', []),
              });
              setIsVisitableDrawerUpdate(true);
            },
          };
        }}
        dataSource={dataSource}
        loading={loading || refreshLoading}
        title={() => (
          <div className='relative'>
            <div className='text-center text-2xl font-medium'>List Invoices</div>
            <Button className='absolute right-2 top-[10px]' type='primary' onClick={handleRefreshData}>
              Refresh
            </Button>
          </div>
        )}
      />
      <UpdateInvoice
        selectedInvoice={selectedInvoice}
        setIsVisitableDrawerUpdate={setIsVisitableDrawerUpdate}
        isVisitableDrawerUpdate={isVisitableDrawerUpdate}
      />
    </main>
  );
};

export default AdminOrders;
