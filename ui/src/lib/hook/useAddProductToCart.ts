import _ from 'lodash';
import { ApolloError, useMutation } from '@apollo/client';
import { useAuththor } from './useAuththor';
import { ADD_PRODUCT_TO_CART_MUTATION } from '../graphql/mutation';
import { GET_ALL_USER_CART } from '../graphql/query';

type Cart = {
  name: string;
  description: string;
  topic: string;
};

type AddProductToCartDto = {
  carts: {
    name: string;
    description: string;
    topic: string;
    uid: number;
  };
  pid: number;
  quantity: number;
};

export const useAddProductToCart = (
  cart: Cart | undefined,
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

  const { currentUser, error: unAuthorError } = useAuththor();
  const defaultCart: Cart = {
    name: 'Default Cart',
    description: 'This is Default cart',
    topic: 'Default',
  };

  const addProductDto: AddProductToCartDto = cart
    ? {
        carts: {
          ...cart,
          uid: Number(currentUser.id ?? 0),
        },
        pid: Number(pid),
        quantity,
      }
    : {
        carts: {
          ...defaultCart,
          uid: Number(currentUser.id ?? 0),
        },
        pid: Number(pid),
        quantity,
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
