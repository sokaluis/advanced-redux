import { createSlice } from '@reduxjs/toolkit';
import { JSONUsers, TStatus } from '../../typescript';
import { fetchUsers } from './usersThunks';

export interface IUsersState {
  users: JSONUsers[];
  loading: TStatus;
  error: string | null;
}

const initialState: IUsersState = {
  users: [],
  loading: 'idle',
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.users = payload as JSONUsers[];
        state.loading = 'succeeded';
        state.error = null;
      });
  }
});

// Action creators are generated for each case reducer function
export const { } = usersSlice.actions;