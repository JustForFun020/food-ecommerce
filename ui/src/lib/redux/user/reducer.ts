import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  username: string;
}

const initialState: UserState = {
  username: '',
};

const reducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    getLoginInfo: (state, action) => {
      state.username = action.payload.username;
      localStorage.setItem('username', action.payload.username);
    },
  },
});

export const { getLoginInfo } = reducer.actions;
export const userReducer = reducer.reducer;
