import { createAsyncThunk } from "@reduxjs/toolkit";
import { JSONPosts } from '../../typescript/types';
import axios from "axios";
import { AsyncMatcher } from '../../typescript/store';
import { IPostsState } from '../../feature/post/postsSlice';
import { extendedMatcher, initReactions } from "../../utils";

interface AddNewPostMatcher extends AsyncMatcher<IPostsState, any> { }

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: JSONPosts) => {
  try {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return errorMessage;
  }
});

export const addNewPostMatcher: AddNewPostMatcher = {
  ...extendedMatcher<IPostsState, typeof addNewPost>(addNewPost),
  matcher: (action) => action.type === addNewPost.fulfilled.type,
  reducer(state, action) {
    state.status = 'succeeded';
    action.payload.userId = Number(action.payload.userId);
    action.payload.date = new Date().toISOString();
    action.payload.reactions = initReactions;
    state.posts.push(action.payload);
  },
};