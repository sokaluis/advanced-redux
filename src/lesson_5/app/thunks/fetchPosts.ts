import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { AsyncFullMatchers, IPostsState, JSONPosts } from "../../typescript";
import { sub } from "date-fns";
import { extendedMatcher, initReactions } from "../../utils";
import { EntityPost, EntityPostState, postsAdapter } from '../../feature/post/postsSlice';

interface IFetchPostMatcher extends AsyncFullMatchers<EntityPostState, EntityPost[]> { }

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPostsThunk = createAsyncThunk('posts/fetchPosts', async (): Promise<JSONPosts[] | string> => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return errorMessage;
  }
});

export const fetchPostMatcher: IFetchPostMatcher = {
  ...extendedMatcher<IPostsState, typeof fetchPostsThunk>(fetchPostsThunk),
  matcher: (action) => action.type === fetchPostsThunk.fulfilled.type,
  reducer: (state, action) => {
    state.status = 'succeeded';
    // Adding date and reactions
    let min = 1;
    const loadedPosts = action.payload.map((post) => {
      post.date = sub(new Date(), { minutes: min++ }).toISOString();
      post.reactions = initReactions;
      return post;
    });

    // Add any fetched posts to the array
    postsAdapter.upsertMany(state, loadedPosts);
  },
};