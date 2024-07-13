import { gql } from '@apollo/client';
import { CART_FIELD } from '../fragments';

export const getAllUserCarts = gql`
  ${CART_FIELD}
  query GetAllUserCart($uid: Float!) {
    getAllUserCarts(uid: $uid) {
      ...cartField
    }
  }
`;
