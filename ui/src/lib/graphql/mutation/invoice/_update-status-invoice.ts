import { gql } from '@apollo/client';
import { INVOICE_FIELD } from '../../fragments';

export const updateStatusInvoice = gql`
  mutation UpdateStatusInvoice($id: Float!) {
    toggleStatusInvoice(id: $id) {
      id
    }
  }
`;
