import { gql } from '@apollo/client';

export const getAllCategories = gql`
  query getAllCategories {
    getCategories {
      name
      image
      description
    }
  }
`;
