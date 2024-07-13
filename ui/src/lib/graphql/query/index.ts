// Product query
import { getAllProducts } from './_get-all-products';
import { getProductByName } from './_get-product-by-name';
import { getProductById } from './_get-product-by-id';
import { getProductsByCategory } from './_get-products-by-category';

export const GET_ALL_PRODUCTS_QUERY = getAllProducts;
export const GET_PRODUCT_BY_ID_QUERY = getProductById;
export const GET_PRODUCT_BY_NAME_QUERY = getProductByName;
export const GET_PRODUCT_BY_CATEGORY_QUERY = getProductsByCategory;

// Categories quey
import { getAllCategories } from './_get-all-categories';

export const GET_ALL_CATEGORIES_QUERY = getAllCategories;

// User query
import getUserByUsername from './_get-user-by-username';

export const GET_USER_BY_USERNAME_QUERY = getUserByUsername;

// Cart query
import { getAllUserCarts } from './_get-all-cart';

export const GET_ALL_USER_CART = getAllUserCarts;
