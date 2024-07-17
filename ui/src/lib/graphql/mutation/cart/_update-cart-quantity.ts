import { gql } from '@apollo/client';

export const updateCartProductQuantity = gql`
  mutation UpdateCartProductQuantity($updateCartProductQuantityDto: [UpdateCartProductQuantityDto!]!) {
    updateCartProductQuantity(updateCartProductQuantityDto: $updateCartProductQuantityDto)
  }
`;
