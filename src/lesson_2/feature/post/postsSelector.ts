import { createSelector } from '@reduxjs/toolkit';
import { stateSelect } from '../../app/stores';

export const selectAllPosts = createSelector(stateSelect, state => state.posts);