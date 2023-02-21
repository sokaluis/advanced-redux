import { createSlice } from '@reduxjs/toolkit';
import { JSONUsers, TStatus } from '../../typescript';
import { fetchUsersMatcher } from '../../app/thunks';

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
    builder.addMatcher(fetchUsersMatcher.matcher, fetchUsersMatcher.reducer);
  }
});

// Action creators are generated for each case reducer function
export const { } = usersSlice.actions;