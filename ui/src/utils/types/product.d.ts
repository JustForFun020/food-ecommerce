import { NameOfCategories } from '../enum/categories';

export type Product = {
  id: number;
  name: string;
  amount: number;
  price: number;
  description: string;
  categories: Categories;
  images: ProductImage[];
};

export type Categories = {
  name: NameOfCategories;
  image: string;
  description: string;
};

export type ProductImage = {
  image: string;
  imageUrl: string;
};
