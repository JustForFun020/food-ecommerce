import { CartProducts } from '@/utils/types/cart';
import { createSlice } from '@reduxjs/toolkit';

interface CartProps {
  cartInformation: {
    name: string;
    topic: string;
    description: string;
  };
  cartProducts: CartProducts[];
}

const initialState: CartProps = {
  cartInformation: {
    name: '',
    topic: '',
    description: '',
  },
  cartProducts: [],
};

const reducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setBasicInformationCart: (state, action) => {
      state.cartInformation = action.payload;
    },
    setProductQuantity: (state, action) => {
      state.cartProducts = action.payload;
    },
  },
});

export const { setBasicInformationCart, setProductQuantity } = reducer.actions;
export const cartReducer = reducer.reducer;
