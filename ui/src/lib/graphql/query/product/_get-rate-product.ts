import { gql } from '@apollo/client';
import { RATE_FIELD } from '../fragments';

export const GET_RATE_PRODUCT = gql`
  ${RATE_FIELD}
  query GetRateProduct($productName: String!) {
    getRateByProduct(productName: $productName) {
      ...rateField
    }
  }
`;
