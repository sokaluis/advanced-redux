import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { addNewPost, fetchPosts } from './postsThunk';
import { sub } from "date-fns";
import { JSONPosts, TStatus } from '../../typescript/types';

interface IPosts {
  posts: IPost[];
  status: TStatus;
  error: null | Error;
}

export interface IPost extends JSONPosts {
  date: string;
  reactions: IReactions;
}

export interface IReactions {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}

type TReaction = {
  postId: number;
  reaction: keyof IReactions;
};

const initialState: IPosts = {
  posts: [],
  status: 'idle',
  error: null
};

const initReactions: IReactions = {
  thumbsUp: 0,
  wow: 0,
  heart: 0,
  rocket: 0,
  coffee: 0
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<IPosts>) {
        state.posts = action.payload.posts;
        state.status = action.payload.status;
        state.error = action.payload.error;
      },
      prepare(title: string, body: string, userId: number) {
        const newPost: IPost = {
          id: Number(nanoid()),
          title,
          body,
          userId,
          date: new Date().toISOString(),
          reactions: initReactions
        };
        const payload: IPosts = {
          posts: [newPost],
          status: 'succeeded',
          error: null,
        };
        return { payload };
      },
    },
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
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post: any) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = initReactions;
          return post;
        });

        // Add any fetched posts to the array
        state.posts = loadedPosts;
      })
      .addCase(fetchPosts.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = initReactions;
        state.posts.push(action.payload);
      });
  },
});

// Action creators are generated for each case reducer function
export const { postAdded, reactionAdded } = postsSlice.actions;