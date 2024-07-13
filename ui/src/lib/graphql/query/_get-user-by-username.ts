import { gql } from '@apollo/client';
import { USER_FIELD } from '../fragments';

const getUserByUsername = gql`
  ${USER_FIELD}
  query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      ...userField
    }
  }
`;

export default getUserByUsername;
