// Auth mutation exports
import { signup } from './_signup';
import { login } from './_login';

export const LOGIN_MUTATION = login;
export const SIGNUP_MUTATION = signup;

// Product mutation exports
import { createProduct } from './_create-product';

export const CREATE_PRODUCT_MUTATION = createProduct;

// User mutation exports
import { updateUser } from './_update-user';

export const UPDATE_USER_MUTATION = updateUser;

// Rate mutation exports
import { createRate } from './_create-rate';

export const CREATE_RATE_MUTATION = createRate;

// Cart mutation exports
import { addProductToCart } from './_add-to-cart';
import { deleteCart } from './_delete-cart';
import { updateBasicInformationCart } from './_update-info-cart';
import { updateCartProductQuantity } from './_update-cart-quantity';

export const ADD_PRODUCT_TO_CART_MUTATION = addProductToCart;
export const DELETE_CART_MUTATION = deleteCart;
export const UPDATE_BASIC_INFORMATION_CART_MUTATION = updateBasicInformationCart;
export const UPDATE_CART_PRODUCT_QUANTITY_MUTATION = updateCartProductQuantity;
