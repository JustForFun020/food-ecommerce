import { gql } from '@apollo/client';

export const createPayment = gql`
  mutation CreatePayment($createPaymentDto: CreatePaymentDto!) {
    createPayment(createPaymentDto: $createPaymentDto)
  }
`;
