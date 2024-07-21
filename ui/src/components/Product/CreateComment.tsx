import { CREATE_RATE_MUTATION } from '@/lib/graphql/mutation';
import { GET_RATE_PRODUCT } from '@/lib/graphql/query/product/getRateProduct';
import { Rate as RateType } from '@/utils/types/rate';
import { CommentOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button, Input, message, Modal, Rate } from 'antd';
import React, { useState } from 'react';

interface CreateCommentProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: any;
  productName: string;
  setListRate: React.Dispatch<React.SetStateAction<RateType[]>>;
}

interface CommentState {
  rating: number;
  comment: string;
}

const CreateComment = ({
  isModalVisible,
  setIsModalVisible,
  currentUser,
  productName,
  setListRate,
}: CreateCommentProps) => {
  const [commentValue, setCommentValue] = useState<CommentState>({ rating: 0, comment: '' } as CommentState);

  const [createComment, { loading: createCommentLoading }] = useMutation(CREATE_RATE_MUTATION, {
    refetchQueries: [
      {
        query: GET_RATE_PRODUCT,
        variables: {
          productName,
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
    update: (cache, { data }) => {
      const rates = cache.readQuery<{ getRateByProduct: RateType[] }>({
        query: GET_RATE_PRODUCT,
        variables: {
          productName,
        },
      });
      if (rates) {
        cache.writeQuery({
          query: GET_RATE_PRODUCT,
          variables: {
            productName,
          },
          data: {
            getRateByProduct: [data.createRate, ...rates.getRateByProduct],
          },
        });
        setListRate([...rates.getRateByProduct, data.createRate]);
      }
    },
  });

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
          name: productName,
          uid: currentUser.id,
        },
      },
    });
  };

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
        <Rate
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
        <Button
          key={'btn__comment'}
          icon={<CommentOutlined />}
          onClick={handleCreateComment}
          type='primary'
          loading={createCommentLoading}
        >
          Comment
        </Button>
      </div>
    </Modal>
  );
};

export default CreateComment;
