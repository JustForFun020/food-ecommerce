import { gql } from '@apollo/client';

export const deleteCategoryProduct = gql`
  mutation DeleteProductFromCategory($categoryId: Float!, $productId: Float!) {
    deleteProductFromCategory(productId: $productId, categoryId: $categoryId) {
      id
    }
  }
`;
