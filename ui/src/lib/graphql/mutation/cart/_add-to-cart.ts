import { gql } from '@apollo/client';
import { CART_PRODUCT_FILED } from '../fragments';

export const addProductToCart = gql`
  ${CART_PRODUCT_FILED}
  mutation AddProductToCart($addProductDto: CreateCartProductsDto!) {
    addProductToCart(addProductDto: $addProductDto) {
      ...cartProductField
    }
  }
`;
