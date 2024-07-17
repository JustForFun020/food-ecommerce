// Auth mutation exports
import { signup } from './user/_signup';
import { login } from './user/_login';

export const LOGIN_MUTATION = login;
export const SIGNUP_MUTATION = signup;

// Product mutation exports
import { createProduct } from './product/_create-product';

export const CREATE_PRODUCT_MUTATION = createProduct;

// User mutation exports
import { updateUser } from './user/_update-user';

export const UPDATE_USER_MUTATION = updateUser;

// Rate mutation exports
import { createRate } from './product/_create-rate';

export const CREATE_RATE_MUTATION = createRate;

// Cart mutation exports
import { addProductToCart } from './cart/_add-to-cart';
import { deleteCart } from './cart/_delete-cart';
import { updateBasicInformationCart } from './cart/_update-info-cart';
import { updateCartProductQuantity } from './cart/_update-cart-quantity';
import { deleteProductFromCart } from './cart/_delete-product-from-cart';

export const ADD_PRODUCT_TO_CART_MUTATION = addProductToCart;
export const DELETE_CART_MUTATION = deleteCart;
export const UPDATE_BASIC_INFORMATION_CART_MUTATION = updateBasicInformationCart;
export const UPDATE_CART_PRODUCT_QUANTITY_MUTATION = updateCartProductQuantity;
export const DELETE_PRODUCT_FROM_CART_MUTATION = deleteProductFromCart;

// Category mutation exports
import { deleteCategory } from './category/_delete-category';
import { deleteCategoryProduct } from './category/_delete-category-product';
import { updateCategory } from './category/_update-category';

export const DELETE_CATEGORY_PRODUCT_MUTATION = deleteCategoryProduct;
export const DELETE_CATEGORY_MUTATION = deleteCategory;
export const UPDATE_CATEGORY_MUTATION = updateCategory;
