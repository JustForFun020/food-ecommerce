import { gql } from '@apollo/client';

export const getInvoiceById = gql`
  query GetInvoiceById($id: Float!) {
    getInvoiceById(id: $id) {
      id
      price
      status
    }
  }
`;
