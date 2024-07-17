import { gql } from '@apollo/client';
import { USER_FIELD } from '../../fragments';

export const updateUser = gql`
  ${USER_FIELD}
  mutation UpdateUser($updateUserDto: UpdateUserDto!) {
    updateUser(updateUserDto: $updateUserDto) {
      ...userField
    }
  }
`;
