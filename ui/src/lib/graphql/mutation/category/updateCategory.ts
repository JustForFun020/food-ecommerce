import { gql } from '@apollo/client';

export const updateCategory = gql`
  mutation UpdateCategory($updateCategoryDto: UpdateCategoryDto!) {
    updateCategory(updateCategoryDto: $updateCategoryDto) {
      id
    }
  }
`;
