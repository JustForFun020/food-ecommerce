import { SEARCH_PRODUCT_QUERY } from '@/lib/graphql/query';
import { Product } from '@/utils/types/product';
import { CloseOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/client';
import { Button, Input, Modal } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

interface SearchModalProps {
  isListSearchVisible: boolean;
  setListSearchVisible: (value: boolean) => void;
  handleClickProduct: (product: Product) => void;
}

const SearchModal = ({ isListSearchVisible, setListSearchVisible, handleClickProduct }: SearchModalProps) => {
  const [defaultDebounceValue, setDefaultDebounceValue] = useState('');
  const [debouncedValue, setValue] = useDebounceValue(defaultDebounceValue, 500);

  const [searchProduct, { loading, data }] = useLazyQuery(SEARCH_PRODUCT_QUERY);
  const listSearchProduct = _.get<Product[]>(data, 'searchProduct', []);

  const router = useRouter();

  useEffect(() => {
    setValue(defaultDebounceValue);
  }, [defaultDebounceValue, setValue]);

  useEffect(() => {
    handleSearch();
  }, [debouncedValue]);

  const handleSearch = () => {
    if (debouncedValue) {
      searchProduct({
        variables: {
          name: debouncedValue,
        },
      });
    }
  };

  return (
    <Modal
      open={isListSearchVisible}
      className='overflow-hidden'
      footer={[]}
      closable={false}
      title={
        <div className='flex items-center justify-between mb-6'>
          <Input.Search
            placeholder='Search food here...'
            className='w-[300px]'
            onChange={(e) => {
              setDefaultDebounceValue(e.target.value);
            }}
            onClick={() => setListSearchVisible(true)}
            value={defaultDebounceValue}
          />
          <Button
            icon={<CloseOutlined />}
            onClick={() => {
              setListSearchVisible(false);
              setDefaultDebounceValue('');
            }}
          ></Button>
        </div>
      }
    >
      {debouncedValue === '' || _.isEmpty(listSearchProduct) ? (
        <div className='p-18 flex items-center justify-center text-lg opacity-65 font-medium mt-10'>Not Found</div>
      ) : (
        <ul className='*:leading-8 *:shadow-sm *:opacity-70 transition-all duration-200 pb-6 max-h-[400px] overflow-y-auto pl-6 pr-6'>
          {listSearchProduct.map((product) => (
            <li
              key={product.id}
              onClick={() => handleClickProduct(product)}
              className='mb-2 pb-2 border-b border-b-slate-950 *:text-lg shadow-md cursor-pointer flex justify-between items-center hover:opacity-100 hover:font-medium'
            >
              <span className='w-2/3'>{product.name}</span>
              <span>$ {product.price}</span>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default SearchModal;
