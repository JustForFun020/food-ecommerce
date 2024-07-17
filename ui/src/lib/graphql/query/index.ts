// Product query
import { getAllProducts } from './product/_get-all-products';
import { getProductByName } from './product/_get-product-by-name';
import { getProductById } from './product/_get-product-by-id';
import { getProductsByCategory } from './product/_get-products-by-category';

export const GET_ALL_PRODUCTS_QUERY = getAllProducts;
export const GET_PRODUCT_BY_ID_QUERY = getProductById;
export const GET_PRODUCT_BY_NAME_QUERY = getProductByName;
export const GET_PRODUCT_BY_CATEGORY_QUERY = getProductsByCategory;

// Categories quey
import { getCategoryByName } from './category/_get-category-by-name';
import { getAllCategories } from './category/_get-all-categories';

export const GET_ALL_CATEGORIES_QUERY = getAllCategories;
export const GET_CATEGORY_BY_NAME_QUERY = getCategoryByName;

// User query
import { getAllUsers } from './user/_get-all-users';
import getUserByUsername from './user/_get-user-by-username';

export const GET_USER_BY_USERNAME_QUERY = getUserByUsername;
export const GET_ALL_USERS_QUERY = getAllUsers;

// Cart query
import { getAllUserCarts } from './cart/_get-all-cart';

export const GET_ALL_USER_CART = getAllUserCarts;
