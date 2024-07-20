import _ from 'lodash';
import { ApolloError, useMutation } from '@apollo/client';
import { useAuththor } from './useAuththor';
import { ADD_PRODUCT_TO_CART_MUTATION } from '../graphql/mutation';
import { GET_ALL_USER_CART } from '../graphql/query';

type AddProductToCartDto = {
  cid: number;
  pid: number;
  quantity: number;
  uid: number;
};

export const useAddProductToCart = (
  cid: number | undefined,
  pid: number,
  quantity: number,
  handle?: {
    handleCompleted?: (res: any) => any;
    handleError?: (error?: ApolloError) => any;
  },
) => {
  const { handleCompleted, handleError } = handle as {
    handleCompleted?: (res: any) => any;
    handleError?: (error?: ApolloError) => any;
  };

  const { currentUser } = useAuththor();

  const addProductDto: AddProductToCartDto = {
    cid: cid ? Number(cid) : 0,
    pid: Number(pid),
    quantity: Number(quantity),
    uid: Number(currentUser?.id) ?? 0,
  };

  const [addProductToCart, { loading, data, error }] = useMutation(ADD_PRODUCT_TO_CART_MUTATION, {
    variables: { addProductDto },
    onCompleted: (data) => {
      handleCompleted && handleCompleted(data);
    },
    onError: (error) => {
      handleError && handleError(error);
    },
    refetchQueries: [{ query: GET_ALL_USER_CART, variables: { uid: Number(currentUser.id) } }],
  });

  return {
    addProductToCart,
    addProductToCartLoading: loading,
    addProductToCartData: data,
    addProductToCartError: error,
  };
};
