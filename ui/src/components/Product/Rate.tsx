'use client';

import _ from 'lodash';
import React, { useState } from 'react';
import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Modal, Rate as AntdRate, Input, message, Avatar, Tooltip } from 'antd';
import { Rate as RateType } from '@/utils/types/rate';
import { CREATE_RATE_MUTATION } from '@/lib/graphql/mutation';
import { useAuththor } from '@/lib/hook/useAuththor';
import moment from 'moment';
import { GET_RATE_PRODUCT } from '@/lib/graphql/query/product/getRateProduct';

interface CommentProps {
  rating: number;
  comment: string;
}

const Rate = ({ name }: { name: string }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentValue, setCommentValue] = useState<CommentProps>({ rating: 0, comment: '' } as CommentProps);
  const { currentUser } = useAuththor();

  const { loading, data: ratesData } = useQuery(GET_RATE_PRODUCT, {
    variables: {
      productName: name,
    },
  });
  const [createComment, { loading: createCommentLoading, data: createCommentData }] = useMutation(
    CREATE_RATE_MUTATION,
    {
      refetchQueries: [
        {
          query: GET_RATE_PRODUCT,
          variables: {
            productName: name,
          },
        },
      ],
      onCompleted: () => {
        setIsModalVisible(false);
        setCommentValue({ rating: 0, comment: '' });
        message.success('Comment successfully');
      },
      onError: (error) => {
        message.error(error.message);
      },
    },
  );

  const rates = _.get<RateType[]>(ratesData, 'getRateByProduct', []);

  const handleCreateComment = () => {
    if (commentValue.comment === '') {
      message.error('Please enter your comment');
      return;
    }
    if (commentValue.rating === 0) {
      message.error('Score must be greater than 0');
      return;
    }
    createComment({
      variables: {
        createRateDto: {
          score: commentValue.rating,
          comment: commentValue.comment,
          name: name,
          uid: currentUser.id,
        },
      },
    });
  };

  const openCommentModal = () => {
    return (
      <Modal
        title={<div className='text-center text-2xl tracking-wide font-medium mb-4'>Create your comment!!!</div>}
        open={isModalVisible}
        onOk={() => {}}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <div
            className='text-center p-12 font-medium tracking-wide opacity-70 pt-4 border-t border-t-slate-300'
            key={'footer-text'}
          >
            We are very grateful for your contribution to the dish🥰🥰{"(●'◡'●)"}🥰🥰
          </div>,
        ]}
        maskClosable={true}
      >
        <div className='*:mb-4 *:leading-8 mb-4'>
          <AntdRate
            onChange={(value: number) => setCommentValue({ ...commentValue, rating: value })}
            value={commentValue.rating}
          />
          <Input.TextArea
            placeholder='Comment here...'
            onChange={(e) => setCommentValue({ ...commentValue, comment: e.target.value })}
            value={commentValue.comment}
          />
        </div>
        <div className='text-right mb-4'>
          <Button key={'btn__comment'} icon={<CommentOutlined />} onClick={handleCreateComment} type='primary'>
            Comment
          </Button>
        </div>
      </Modal>
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='ml-8 mr-8'>
      <div className='flex justify-between mb-6'>
        <h1 className='text-3xl font-medium tracking-wide'>Customer Rating</h1>
        <div className='text-center'>
          <Button onClick={() => setIsModalVisible(true)} type='primary' icon={<CommentOutlined />}>
            Comment
          </Button>
        </div>
      </div>
      <div className='pr-12 pl-12 mr-12 max-h-[800px] overflow-auto'>
        <div>
          <div className='p-6'>
            {rates.length === 0 ? (
              <p className='flex items-center justify-center h-full text-xl font-medium opacity-80'>No ratings yet</p>
            ) : (
              rates.map((rating, index) => (
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
