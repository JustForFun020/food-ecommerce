import _ from 'lodash';
import { ApolloError, useMutation } from '@apollo/client';
import { useAuththor } from './useAuththor';
import { ADD_PRODUCT_TO_CART_MUTATION } from '../graphql/mutation';
import { GET_ALL_USER_CART } from '../graphql/query';
import { message } from 'antd';

export const useAddProductToCart = () => {
  const { currentUser } = useAuththor();

  const [addProductToCart, { loading, data, error }] = useMutation(ADD_PRODUCT_TO_CART_MUTATION, {
    onCompleted: (data) => {
      message.success('Add product to cart successfully');
    },
    onError: (error) => {
      message.error(`Add product to cart failed: ${error.message}`);
    },
    refetchQueries(result) {
      return [{ query: GET_ALL_USER_CART, variables: { uid: Number(currentUser?.id) } }];
    },
  });

  const handleAddProductToCart = (cid: number | undefined, pid: number, quantity: number) => {
    addProductToCart({
      variables: {
        addProductDto: {
          cid: cid ? Number(cid) : 0,
          pid: Number(pid),
          quantity: Number(quantity),
          uid: Number(currentUser?.id) ?? 0,
        },
      },
    });
  };

  return {
    handleAddProductToCart,
    addProductToCartLoading: loading,
    addProductToCartData: data,
    addProductToCartError: error,
  };
};
