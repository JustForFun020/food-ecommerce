import { gql } from '@apollo/client';

export const signup = gql`
  mutation Signup($signUpDto: SignUpDto!) {
    signup(signUpDto: $signUpDto) {
      token
    }
  }
`;
