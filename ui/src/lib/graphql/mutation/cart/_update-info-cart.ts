import { gql } from '@apollo/client';

export const updateBasicInformationCart = gql`
  mutation UpdateBasicInformationCart($updateBasicInformationCartDto: UpdateBasicInformationCartDto!) {
    updateBasicInfoCart(updateBasicInfoCartDto: $updateBasicInformationCartDto) {
      id
    }
  }
`;
