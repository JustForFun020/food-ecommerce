import { gql } from '@apollo/client';

export const createCart = gql`
  mutation CreateCart($createCartDto: CreateCartDto!) {
    createCart(createCartDto: $createCartDto) {
      id
    }
  }
`;
