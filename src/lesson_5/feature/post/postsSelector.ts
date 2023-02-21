import { createSelector } from '@reduxjs/toolkit';
import { RootState, stateSelect } from '../../app/stores';
import { postsAdapter } from './postsSlice';

export const getPostsStatus = createSelector(stateSelect, state => state.posts.status);
export const getPostsErrors = createSelector(stateSelect, state => state.posts.error);
export const getCounter = createSelector(stateSelect, state => state.posts.count);

// getSelector creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors<RootState>(state => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_: RootState, userId) => userId],
  (posts, userId) => posts.filter(post => post.userId === userId)
);