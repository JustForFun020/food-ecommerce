import { gql } from '@apollo/client';

export const deleteProductFromCart = gql`
  mutation DeleteProductFromCart($pid: Float!, $cid: Float!) {
    deleteProductFromCart(pid: $pid, cid: $cid)
  }
`;
