import { gql } from '@apollo/client';

export const deleteCart = gql`
  mutation DeleteCart($cid: Float!) {
    deleteCart(cid: $cid)
  }
`;
