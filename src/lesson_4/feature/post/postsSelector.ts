import { createSelector } from '@reduxjs/toolkit';
import { stateSelect } from '../../app/stores';

export const selectAllPosts = createSelector(stateSelect, state => state.posts.posts);
export const getPostsStatus = createSelector(stateSelect, state => state.posts.status);
export const getPostsErrors = createSelector(stateSelect, state => state.posts.error);