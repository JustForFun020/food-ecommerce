import { gql } from '@apollo/client';
import { PRODUCT_FIELD } from '../fragments';

export const getAllProducts = gql`
  ${PRODUCT_FIELD}
  query getAllProducts($page: Float!, $limit: Float!) {
    getAllProduct(page: $page, limit: $limit) {
      data {
        ...productField
      }
      total
    }
  }
`;
