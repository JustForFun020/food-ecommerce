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
  product: Product[];
  cart: Cart;
  price: number;
};
