import { gql } from '@apollo/client';
import { PRODUCT_FIELD } from '../../fragments';

export const getProductByName = gql`
  ${PRODUCT_FIELD}
  query getProductByName($name: String!) {
    getProductByName(name: $name) {
      ...productField
    }
  }
`;
