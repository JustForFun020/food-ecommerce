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
    setCartCheckout: (state, action) => {
      state.cartProducts = action.payload;
    },
  },
});

export const { setCartCheckout } = reducer.actions;
export const cartReducer = reducer.reducer;
