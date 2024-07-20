import { Cart, Invoice } from './cart';
import { Rate } from './rate';

export type User = {
  id: string;
  username: string;
  address: string;
  phone: string;
  email: string;
  carts: Cart[];
  rates: Rate[];
  roles: {
    name: 'USER' | 'ADMIN';
    id: number;
  }[];
  invoices: Invoice[];
};
