import { gql } from '@apollo/client';
import { CATEGORY_FIELD } from '../fragments';

export const getCategoryByName = gql`
  ${CATEGORY_FIELD}
  query GetCategoryByName($name: String!) {
    getCategoryByName(name: $name) {
      ...categoryField
    }
  }
`;
