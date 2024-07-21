'use client';

import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Button, Rate as AntdRate, Avatar, Tooltip, Select } from 'antd';
import { Rate as RateType } from '@/utils/types/rate';
import { useAuththor } from '@/lib/hook/useAuththor';
import moment from 'moment';
import { GET_RATE_PRODUCT } from '@/lib/graphql/query/product/getRateProduct';
import CreateComment from './CreateComment';
import { ValueOfRate } from '@/utils/enum/rate';

const filterRateValue = [
  {
    label: '5 stars',
    value: ValueOfRate.FIVE,
  },
  {
    label: '4 stars',
    value: ValueOfRate.FOUR,
  },
  {
    label: '3 stars',
    value: ValueOfRate.THREE,
  },
  {
    label: '2 stars',
    value: ValueOfRate.TWO,
  },
  {
    label: '1 stars',
    value: ValueOfRate.ONE,
  },
  {
    label: 'All',
    value: 0,
  },
];

const Rate = ({ name }: { name: string }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listRate, setListRate] = useState<RateType[]>([]);
  const [currentFilterRate, setCurrentFilterRate] = useState(0);

  const { currentUser } = useAuththor();

  const { loading, data: ratesData } = useQuery(GET_RATE_PRODUCT, {
    variables: {
      productName: name,
    },
    onCompleted: (data) => {
      const rates = _.get<RateType[]>(ratesData, 'getRateByProduct', []);
      setListRate(rates);
    },
  });

  const handleFilterRate = (value: number) => {
    const rates = _.get<RateType[]>(ratesData, 'getRateByProduct', []);
    setCurrentFilterRate(value);
    if (value === 0) {
      setListRate(rates);
    } else {
      const listSearchRates = _.filter<RateType>(rates, (rate) => rate.score === value);
      setListRate(listSearchRates);
    }
  };

  const openCommentModal = () => {
    return (
      <CreateComment
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        currentUser={currentUser}
        productName={name}
        key={'create-comment'}
        setListRate={setListRate}
      />
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='ml-8 mr-8'>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <h1 className='text-3xl font-medium tracking-wide'>Customer Rating</h1>
          <Select
            options={filterRateValue}
            className='w-[200px]'
            onSelect={(e) => handleFilterRate(e)}
            value={currentFilterRate}
          />
        </div>
        <div className='text-center'>
          <Button onClick={() => setIsModalVisible(true)} type='primary' icon={<CommentOutlined />}>
            Comment
          </Button>
        </div>
      </div>
      <div className='pr-12 pl-12 mr-12 max-h-[800px] overflow-auto'>
        <div>
          <div className='p-6'>
            {listRate.length === 0 ? (
              <p className='flex items-center justify-center h-full text-xl font-medium opacity-80'>No ratings yet</p>
            ) : (
              _.map(listRate, (rating, index) => (
                <div key={rating.id} className='flex items-center mb-6 p-6 shadow-md overflow-auto h-full'>
                  <Avatar size={64} icon={<UserOutlined />} />
                  <div>
                    <p className='ml-4 text-lg font-medium'>{rating.user.username}</p>
                    <Tooltip title={moment(rating.createdAt).format('HH:mm DD/MM/YYYY')}>
                      <p className='cursor-default ml-4 text-sm font-light opacity-70'>
                        {moment(rating.createdAt).fromNow()}
                      </p>
                    </Tooltip>
                    <div className='ml-4'>
                      <AntdRate disabled value={rating.score} />
                      <p className='mt-2'>{rating.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {openCommentModal()}
      </div>
    </div>
  );
};

export default Rate;
