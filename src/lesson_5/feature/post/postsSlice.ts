import { PayloadAction, createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { fetchPostMatcher, addNewPostMatcher, updatePostMatcher, deletePostMatcher } from '../../app/thunks';
import { IPost, IPostsState, TReaction } from '../../typescript';

export interface EntityPostState extends IPostsState, EntityState<IPost> { }

export interface EntityPost extends IPost, EntityState<IPost> { }

export const postsAdapter = createEntityAdapter<IPost>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState: EntityPostState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
  count: 0,
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded: (state, action: PayloadAction<TReaction>) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    increaseCount: (state) => {
      state.count = state.count! + 1;
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
export const { reactionAdded, increaseCount } = postsSlice.actions;