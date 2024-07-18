import { gql } from '@apollo/client';

export const updateCart = gql`
  mutation UpdateCart($updateCartDto: UpdateCartDto!) {
    updateCart(updateCartDto: $updateCartDto) {
      name
    }
  }
`;
