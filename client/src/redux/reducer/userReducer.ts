import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface User {
  name: string;
  email: string;
  products?: []; 
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userReducer.actions;
export default userReducer.reducer; 