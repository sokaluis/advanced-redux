import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../typescript';

const initialState: AuthState = {
  user: null,
  accessToken: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
    }
  },
});

// Action creators are generated for each case reducer function
export const { logOut, setCredentials } = authSlice.actions;