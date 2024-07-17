import { gql } from '@apollo/client';

export const deleteCategory = gql`
  mutation DeleteCategory($id: Float!) {
    deleteCategory(id: $id)
  }
`;
