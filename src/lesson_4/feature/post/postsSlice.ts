import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchPostMatcher, addNewPostMatcher, updatePostMatcher, deletePostMatcher } from '../../app/thunks';
import { IReactions, JSONPosts, TStatus } from '../../typescript';

export interface IPostsState {
  posts: IPost[];
  status: TStatus;
  error: null | string;
}

export interface IPost extends JSONPosts {
  date: string;
  reactions: IReactions;
}

type TReaction = {
  postId: number;
  reaction: keyof IReactions;
};

const initialState: IPostsState = {
  posts: [],
  status: 'idle',
  error: null
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded: (state, action: PayloadAction<TReaction>) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(fetchPostMatcher.matcher, fetchPostMatcher.reducer)
      .addMatcher(fetchPostMatcher.pendingMatcher, fetchPostMatcher.pendingReducer)
      .addMatcher(fetchPostMatcher.rejectedMatcher, fetchPostMatcher.rejectedReducer)
      .addMatcher(addNewPostMatcher.matcher, addNewPostMatcher.reducer)
      .addMatcher(addNewPostMatcher.pendingMatcher, addNewPostMatcher.pendingReducer)
      .addMatcher(addNewPostMatcher.rejectedMatcher, addNewPostMatcher.rejectedReducer)
      .addMatcher(updatePostMatcher.matcher, updatePostMatcher.reducer)
      .addMatcher(deletePostMatcher.matcher, deletePostMatcher.reducer);
  },
});

// Action creators are generated for each case reducer function
export const { reactionAdded } = postsSlice.actions;