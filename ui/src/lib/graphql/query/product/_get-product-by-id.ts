import { gql } from '@apollo/client';

export const getProductById = gql`
  query getProductById($id: Float!) {
    getProduct(id: $id) {
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
