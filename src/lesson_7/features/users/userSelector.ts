import { createSelector } from '@reduxjs/toolkit';
import { RootState, stateSelect } from '../../app/stores';
import { JSONUsers } from '../../typescript';

export const selectAllUsers = createSelector(stateSelect, state => state.users.users);

export const selectUserById = createSelector(
  [selectAllUsers, (_: RootState, userId: number) => userId],
  (usersState, userId) => {
    return usersState.find((user: JSONUsers) => user.id === userId);
  }
);