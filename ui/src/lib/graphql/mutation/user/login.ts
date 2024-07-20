import { gql } from '@apollo/client';

export const login = gql`
  mutation Login($loginDto: LoginDto!) {
    login(loginDto: $loginDto) {
      token
    }
  }
`;
