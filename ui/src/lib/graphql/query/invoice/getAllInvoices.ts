import { gql } from '@apollo/client';
import { INVOICE_FIELD } from '../../fragments';

export const getAllInvoice = gql`
  ${INVOICE_FIELD}
  query GetAllInvoice {
    getAllInvoice {
      ...invoiceField
    }
  }
`;
