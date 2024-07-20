// Product query
import { getAllProducts } from './product/getAllProduct';
import { getProductByName } from './product/getProductByName';
import { getProductById } from './product/getProductById';
import { getProductsByCategory } from './product/getProductByCategory';

export const GET_ALL_PRODUCTS_QUERY = getAllProducts;
export const GET_PRODUCT_BY_ID_QUERY = getProductById;
export const GET_PRODUCT_BY_NAME_QUERY = getProductByName;
export const GET_PRODUCT_BY_CATEGORY_QUERY = getProductsByCategory;
export const SEARCH_PRODUCT_QUERY = searchProduct;
// ------------------------------------------

// Categories quey
import { getCategoryByName } from './category/getCategoryByName';
import { getAllCategories } from './category/getAllCategories';

export const GET_ALL_CATEGORIES_QUERY = getAllCategories;
export const GET_CATEGORY_BY_NAME_QUERY = getCategoryByName;
// ------------------------------------------

// User query
import { getAllUsers } from './user/getAllUsers';
import getUserByUsername from './user/getUserByUsername';

export const GET_USER_BY_USERNAME_QUERY = getUserByUsername;
export const GET_ALL_USERS_QUERY = getAllUsers;
// ------------------------------------------

// Cart query
import { getAllUserCarts } from './cart/getAllCart';

export const GET_ALL_USER_CART = getAllUserCarts;
// ------------------------------------------

// Invoice query
import { getAllInvoice } from './invoice/getAllInvoices';
import { searchProduct } from './product/searchProduct';

export const GET_ALL_INVOICE_QUERY = getAllInvoice;
