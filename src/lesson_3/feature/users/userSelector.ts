import { createSelector } from '@reduxjs/toolkit';
import { stateSelect } from '../../app/stores';

export const selectAllUsers = createSelector(stateSelect, state => state.users.users);