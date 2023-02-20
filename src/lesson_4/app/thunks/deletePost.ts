import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPost, IPostsState } from '../../feature/post/postsSlice';
import axios from "axios";
import { AsyncBasicMatcher } from "../../typescript";

interface IDeletePostMatcher extends AsyncBasicMatcher<IPostsState, IPost> { }

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const deletePostThunk = createAsyncThunk('posts/deletePost', async (initialPost: IPost) => {
  const { id } = initialPost;
  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return errorMessage;
  }
});

export const deletePostMatcher: IDeletePostMatcher = {
  matcher(action) {
    return action.type === deletePostThunk.fulfilled.type;
  },
  reducer(state, action) {
    if (!action.payload?.id) {
      console.log('Delete could not complete');
      console.log(action.payload);
      return;
    }
    const { id } = action.payload;
    const posts = state.posts.filter(post => post.id !== id);
    state.posts = posts;
  },
}; 