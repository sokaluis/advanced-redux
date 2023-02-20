import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncMatcher, JSONPosts } from "../../typescript";
import { IPostsState, IPost } from '../../feature/post/postsSlice';
import { sub } from "date-fns";
import { extendedMatcher, initReactions } from "../../utils";

interface IFetchPostMatcher extends AsyncMatcher<IPostsState, IPost[]> { }

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
    state.posts = loadedPosts;
  },
};