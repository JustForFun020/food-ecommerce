'use client';

import _ from 'lodash';
import { GET_RATE_PRODUCT } from '@/lib/graphql/query/_get-rate-product';
import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Modal, Rate as AntdRate, Input, message, Avatar, Tooltip } from 'antd';
import React from 'react';
import { Rate as RateType } from '@/utils/types/rate';
import { CREATE_RATE_MUTATION } from '@/lib/graphql/mutation';
import { useAuththor } from '@/lib/hook/useAuththor';
import moment from 'moment';

interface CommentProps {
  rating: number;
  comment: string;
}

const Rate = ({ name }: { name: string }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState<CommentProps>({ rating: 0, comment: '' } as CommentProps);
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
        title='Comment'
        open={isModalVisible}
        onOk={() => {}}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key={'btn__comment'} icon={<CommentOutlined />} onClick={handleCreateComment}>
            Comment
          </Button>,
        ]}
        maskClosable={true}
      >
        <AntdRate
          onChange={(value: number) => setCommentValue({ ...commentValue, rating: value })}
          value={commentValue.rating}
        />
        <Input.TextArea
          placeholder='Comment here...'
          onChange={(e) => setCommentValue({ ...commentValue, comment: e.target.value })}
          value={commentValue.comment}
        />
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
