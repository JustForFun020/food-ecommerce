// Auth mutation exports
import { signup } from './user/signUp';
import { login } from './user/login';

export const LOGIN_MUTATION = login;
export const SIGNUP_MUTATION = signup;

// Product mutation exports
import { createProduct } from './product/createProduct';
import { updateProduct } from './product/updateProduct';

export const CREATE_PRODUCT_MUTATION = createProduct;
export const UPDATE_PRODUCT_MUTATION = updateProduct;

// User mutation exports
import { updateUser } from './user/updateUser';

export const UPDATE_USER_MUTATION = updateUser;

// Rate mutation exports
import { createRate } from './product/createRate';

export const CREATE_RATE_MUTATION = createRate;

// Cart mutation exports
import { addProductToCart } from './cart/addProductToCart';
import { deleteCart } from './cart/deleteCart';
import { deleteProductFromCart } from './cart/deleteProductFromCart';
import { updateCart } from './cart/updateCart';
import { createCart } from './cart/createCart';

export const ADD_PRODUCT_TO_CART_MUTATION = addProductToCart;
export const DELETE_CART_MUTATION = deleteCart;
export const DELETE_PRODUCT_FROM_CART_MUTATION = deleteProductFromCart;
export const UPDATE_CART_MUTATION = updateCart;
export const CREATE_CART_MUTATION = createCart;

// Category mutation exports
import { deleteCategory } from './category/deleteCategory';
import { deleteCategoryProduct } from './category/deleteCategoryProduct';
import { updateCategory } from './category/updateCategory';

export const DELETE_CATEGORY_PRODUCT_MUTATION = deleteCategoryProduct;
export const DELETE_CATEGORY_MUTATION = deleteCategory;
export const UPDATE_CATEGORY_MUTATION = updateCategory;

// Invoice mutation exports
import { createInvoice } from './invoice/createInvoice';
import { updateStatusInvoice } from './invoice/updateStatusInvoice';
import { deleteInvoice } from './invoice/deleteInvoice';

export const CREATE_INVOICE_MUTATION = createInvoice;
export const TOGGLE_STATUS_INVOICE_MUTATION = updateStatusInvoice;
export const DELETE_INVOICE_MUTATION = deleteInvoice;
