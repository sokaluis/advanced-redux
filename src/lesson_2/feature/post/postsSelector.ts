import { createSelector } from '@reduxjs/toolkit';
import { stateSelect } from '../../app/stores';

export const postsSelector = createSelector(stateSelect, state => state.posts);