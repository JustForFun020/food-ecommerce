import { gql } from '@apollo/client';

export const createPaymentIntent = gql`
  mutation createPaymentIntent($amount: Float!) {
    createPaymentIntent(amount: $amount)
  }
`;
