import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/stores';
import { extendedApiSlice, initialState, postsAdapter } from './postsSlice';

// returns the query result object
export const selectPostResult = extendedApiSlice.endpoints.getPosts.select();

// creates memoized selector
const selectPostData = createSelector(
  selectPostResult,
  postsResult => postsResult.data // normalized state object with ids & entities
);

// getSelector creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors<RootState>((state: any) => selectPostData(state) ?? initialState);