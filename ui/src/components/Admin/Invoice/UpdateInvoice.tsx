import { DELETE_INVOICE_MUTATION, TOGGLE_STATUS_INVOICE_MUTATION } from '@/lib/graphql/mutation';
import { GET_ALL_INVOICE_QUERY } from '@/lib/graphql/query';
import { Invoice } from '@/utils/types/cart';
import { Product } from '@/utils/types/product';
import { useMutation } from '@apollo/client';
import { Button, Drawer, Image, message, Space, Tag } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';

interface UpdateInvoiceProps {
  selectedInvoice: Invoice;
  isVisitableDrawerUpdate: boolean;
  setIsVisitableDrawerUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateInvoice = ({
  selectedInvoice,
  setIsVisitableDrawerUpdate,
  isVisitableDrawerUpdate,
}: UpdateInvoiceProps) => {
  const { products, status, createdAt } = selectedInvoice;
  const tagColor = status === 'Pending' ? 'orange' : 'green';

  const [toggleStatusInvoice, { loading: toggleStatusInvoiceLoading }] = useMutation(TOGGLE_STATUS_INVOICE_MUTATION, {
    refetchQueries: [{ query: GET_ALL_INVOICE_QUERY }],
    onCompleted: () => {
      setIsVisitableDrawerUpdate(false);
      message.success('Update status invoice successfully');
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
  const [deleteInvoice, { loading: deleteInvoiceLoading }] = useMutation(DELETE_INVOICE_MUTATION, {
    refetchQueries: [{ query: GET_ALL_INVOICE_QUERY }],
    onCompleted: () => {
      setIsVisitableDrawerUpdate(false);
      message.success('Delete invoice successfully');
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handleConfirmInvoice = () => {
    toggleStatusInvoice({ variables: { id: Number(selectedInvoice.id) } });
  };

  const handleDeleteInvoice = () => {
    deleteInvoice({ variables: { id: Number(selectedInvoice.id) } });
  };

  return (
    <Drawer
      title={selectedInvoice.name}
      open={isVisitableDrawerUpdate}
      onClose={() => setIsVisitableDrawerUpdate(false)}
      size='large'
      extra={[
        <Button
          key={'confirm-invoice'}
          className='mr-6'
          type='primary'
          onClick={handleConfirmInvoice}
          loading={toggleStatusInvoiceLoading}
        >
          {status === 'Pending' ? 'Confirm' : 'Unconfirm'}
        </Button>,
        <Button key={'delete-invoice'} danger onClick={handleDeleteInvoice} loading={deleteInvoiceLoading}>
          Delete
        </Button>,
      ]}
      footer={<div className='text-center opacity-65 font-bold text-lg p-8'>@JustForFun</div>}
    >
      <div className='mb-10 *:leading-8'>
        <div className='text-lg'>
          Status: <Tag color={tagColor}>{status}</Tag>
        </div>
        <div className='text-lg'>Price: $ {selectedInvoice.price}</div>
        <div className='text-lg'>CreatedAt: {moment(createdAt).format('HH:mm DD/MM/YYYY')}</div>
      </div>
      <Space direction='vertical' className='w-full' classNames={{ item: '' }}>
        {_.map(products, (product: Product) => {
          return (
            <div className='pr-8 pl-8 pt-4 pb-6 mb-6 border border-slate-300 rounded-lg shadow-md flex items-center justify-between'>
              <Image src={product.images[0].imageUrl} alt={product.name} width={100} height={100} />
              <div className='text-lg font-medium'>{product.name}</div>
              <div className='text-lg font-medium opacity-70'>$ {product.price}</div>
            </div>
          );
        })}
      </Space>
    </Drawer>
  );
};

export default UpdateInvoice;
