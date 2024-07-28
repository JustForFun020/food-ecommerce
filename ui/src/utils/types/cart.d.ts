import { Product } from './product';
import { User } from './user';

export type Cart = {
  id: number;
  name: string;
  user: User;
  cartProducts: CartProducts[];
  topic: string;
  invoice: Invoice;
  description: string;
};

export type CartProducts = {
  id: number;
  product: Product;
  cart: Cart;
  quantity: number;
};

export type Invoice = {
  id: number;
  products: Product[];
  price: number;
  status: string;
  createdAt: string;
  user: User;
  name: string;
};
