import { gql } from '@apollo/client';
import { CATEGORY_FIELD } from '../../fragments';

export const getAllCategories = gql`
  ${CATEGORY_FIELD}
  query getAllCategories {
    getCategories {
      ...categoryField
    }
  }
`;
