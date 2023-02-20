import { createSelector } from '@reduxjs/toolkit';
import { RootState, stateSelect } from '../../app/stores';
import { IPost } from '../../typescript';

export const selectAllPosts = createSelector(stateSelect, state => state.posts.posts);
export const getPostsStatus = createSelector(stateSelect, state => state.posts.status);
export const getPostsErrors = createSelector(stateSelect, state => state.posts.error);
export const getCounter = createSelector(stateSelect, state => state.posts.count);

export const selectPostById = createSelector(
  [selectAllPosts, (_: RootState, postId: number) => postId],
  (postsState, postId) => {
    return postsState.find((post: IPost) => post.id === postId);
  }
);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_: RootState, userId) => userId],
  (posts, userId) => posts.filter(post => post.userId === userId)
);