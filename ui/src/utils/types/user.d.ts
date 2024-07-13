export type User = {
  id: string;
  username: string;
  address: string;
  phone: string;
  email: string;
  carts: {
    name: string;
    cartProducts: {
      quantity: number;
    }[];
  }[];
};
