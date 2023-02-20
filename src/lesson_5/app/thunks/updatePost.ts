import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncBasicMatcher, IPost, IPostsState } from "../../typescript";

interface IUpdatePostMatcher extends AsyncBasicMatcher<IPostsState, IPost> { }

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const updatePostThunk = createAsyncThunk('posts/updatePost', async (initialPost: IPost) => {
  const { id } = initialPost;
  try {
    const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
    return response.data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return errorMessage;
  }
});

export const updatePostMatcher: IUpdatePostMatcher = {
  matcher(action) {
    return action.type === updatePostThunk.fulfilled.type;
  },
  reducer(state, action) {
    if (!action.payload.id) {
      console.log('Update could not complete');
      console.log(action.payload);
      return;
    }
    const { id } = action.payload;
    action.payload.date = new Date().toISOString();
    const posts = state.posts.filter(post => post.id !== id);
    state.posts = [...posts, action.payload];
  },
};