import { gql } from '@apollo/client';

export const deleteInvoice = gql`
  mutation DeleteInvoice($id: Float!) {
    deleteInvoice(id: $id)
  }
`;
