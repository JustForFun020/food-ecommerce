import { gql } from '@apollo/client';

export const searchProduct = gql`
  query SearchProduct($name: String!) {
    searchProduct(name: $name) {
      name
      id
      price
    }
  }
`;
