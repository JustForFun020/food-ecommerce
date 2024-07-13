import { Product } from './product';
import { User } from './user';

export type Rate = {
  id: number;
  score: number;
  comment: string;
  createdAt: Date;
  user: User;
  product: Product;
};
