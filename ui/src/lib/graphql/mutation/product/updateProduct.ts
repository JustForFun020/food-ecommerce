import { gql } from '@apollo/client';
import { PRODUCT_FIELD } from '../../fragments';

export const updateProduct = gql`
  ${PRODUCT_FIELD}
  mutation UpdateProduct($updateProductDto: UpdateProductDto!) {
    updateProduct(updateProductDto: $updateProductDto) {
      ...productField
    }
  }
`;
