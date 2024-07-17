import { gql } from '@apollo/client';

export const USER_FIELD = gql`
  fragment userField on User {
    id
    address
    phone
    email
    avatar
    invoices {
      name
    }
    carts {
      name
    }
    rates {
      comment
    }
  }
`;

export const PRODUCT_FIELD = gql`
  fragment productField on Product {
    id
    name
    price
    description
    amount
    averageRate
    images {
      imageUrl
    }
    categories {
      name
    }
    rates {
      score
      comment
      user {
        username
      }
    }
  }
`;

export const RATE_FIELD = gql`
  ${USER_FIELD}
  fragment rateField on Rate {
    id
    score
    comment
    createdAt
    user {
      username
    }
  }
`;

export const CART_FIELD = gql`
  fragment cartField on Cart {
    id
    name
    description
    topic
    cartProducts {
      product {
        id
        name
        images {
          imageUrl
        }
        price
      }
      quantity
    }
  }
`;

export const CART_PRODUCT_FILED = gql`
  fragment cartProductField on CartProducts {
    id
    cart {
      id
      name
      description
      topic
    }
    product {
      id
      name
      price
      images {
        imageUrl
      }
    }
    quantity
  }
`;

export const CATEGORY_FIELD = gql`
  fragment categoryField on Categories {
    id
    name
    description
    image
    products {
      name
      price
      description
      images {
        imageUrl
      }
      averageRate
    }
  }
`;

export const INVOICE_FIELD = gql`
  fragment invoiceField on Invoice {
    id
    name
    price
    status
    createdAt
    user {
      id
    }
  }
`;
