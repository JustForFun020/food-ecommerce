import { gql } from '@apollo/client';

export const createInvoice = gql`
  mutation CreateInvoice($createInvoiceDto: CreateInvoiceDto!) {
    createInvoice(createInvoiceDto: $createInvoiceDto) {
      id
      price
    }
  }
`;
