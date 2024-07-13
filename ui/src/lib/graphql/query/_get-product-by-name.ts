import { gql } from '@apollo/client';

export const getProductByName = gql`
  query getProductByName($name: String!) {
    getProductByName(name: $name) {
      id
      name
      description
      price
      images {
        imageUrl
      }
      categories {
        name
      }
    }
  }
`;
