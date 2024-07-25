import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_USER_CART } from '../graphql/query';
import { useAuththor } from './useAuththor';
import { useState, useCallback } from 'react';
import _ from 'lodash';

export const useUserCart = () => {
  const [userCart, setUserCart] = useState([]);
  const { currentUser } = useAuththor();

  const { loading } = useQuery(GET_ALL_USER_CART, {
    variables: { uid: currentUser?.id },
    skip: !currentUser?.id,
    onCompleted: (data) => {
      setUserCart(_.get(data, 'getAllUserCarts', []));
    },
  });

  const [getUserCart, { loading: userCartLoading }] = useLazyQuery(GET_ALL_USER_CART, {
    variables: { uid: currentUser?.id },
  });

  return {
    getUserCart,
    loading: loading || userCartLoading,
    userCart,
    setUserCart,
  };
};
