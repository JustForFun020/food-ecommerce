import { INVOICE_FIELD } from './../../fragments/index';
import { gql } from '@apollo/client';

export const createInvoice = gql`
  ${INVOICE_FIELD}
  mutation CreateInvoice($createInvoiceDto: CreateInvoiceDto!) {
    createInvoice(createInvoiceDto: $createInvoiceDto) {
      ...invoiceField
    }
  }
`;
