import { NameOfCategories } from '../enum/categories';
import { NameOfProductTag } from '../enum/product';

export type Product = {
  id: number;
  name: string;
  amount: number;
  price: number;
  description: string;
  categories: Categories;
  images: ProductImage[];
  tags: ProductTag[];
};

export type Categories = {
  id: number;
  name: NameOfCategories;
  image: string;
  description: string;
  products: Product[];
};

export type ProductImage = {
  image: string;
  imageUrl: string;
};

export type ProductTag = {
  id?: number;
  name: NameOfProductTag;
  products?: Product[];
  description?: string;
};
