import { gql } from '@apollo/client';
import { USER_FIELD } from '../fragments';

export const getAllUsers = gql`
  ${USER_FIELD}
  query GetAllUsers {
    getAllUser {
      ...userField
    }
  }
`;
