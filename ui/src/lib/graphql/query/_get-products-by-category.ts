import { gql } from '@apollo/client';

export const getProductsByCategory = gql`
  query getProductByCategory($category: String!) {
    getProductByCategory(category: $category) {
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
