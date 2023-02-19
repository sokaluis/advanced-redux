import { createSlice } from '@reduxjs/toolkit';

export interface IUser {
  id: number;
  name: string;
}

const initialState: IUser[] = [
  { id: 0, name: 'Dude Lebowski' },
  { id: 1, name: 'Neil Young' },
  { id: 2, name: 'Dave Gray' },
];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
});

// Action creators are generated for each case reducer function
export const { } = usersSlice.actions;