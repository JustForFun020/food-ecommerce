import { gql } from '@apollo/client';

export const createProduct = gql`
  mutation createProduct($createProduct: CreateProductDto!, $uploadImage: UploadImageDto!) {
    createProduct(createProduct: $createProduct, uploadImage: $uploadImage) {
      id
      name
      price
    }
  }
`;
