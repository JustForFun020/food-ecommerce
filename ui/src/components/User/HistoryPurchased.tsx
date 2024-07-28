import React, { Fragment } from 'react';
import { Invoice } from '@/utils/types/cart';
import { Collapse, Empty, Image } from 'antd';
import type { CollapseProps } from 'antd';
import _ from 'lodash';
import { formatDate } from '@/utils/formatDate';

interface HistoryPurchasedProps {
  invoices: Invoice[];
}

const HistoryPurchased: React.FC<HistoryPurchasedProps> = ({ invoices }) => {
  const items: CollapseProps['items'] = _.map(invoices, (invoice) => {
    return {
      key: invoice.id,
      label: (
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <span className='text-lg font-medium tracking-wide'>{invoice.name}</span>
            <span className='text-base font-medium opacity-60'>{formatDate(invoice.createdAt)}</span>
          </div>
          <div>
            <span className='font-medium text-base'>$ {invoice.price}</span>
          </div>
        </div>
      ),
      children: (
        <Fragment>
          {_.map(invoice.products, (product, index) => {
            return (
              <div key={index} className='flex items-center justify-between'>
                <Image src={product.images[0].imageUrl} width={50} alt='' />
                <p className='text-lg'>{product.name}</p>
                <p>$ {product.price}</p>
              </div>
            );
          })}
        </Fragment>
      ),
    };
  });

  return <div>{_.isEmpty(invoices) ? <Empty /> : <Collapse items={items} />}</div>;
};

export default HistoryPurchased;