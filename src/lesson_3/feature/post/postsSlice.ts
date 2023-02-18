import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { fetchPosts } from './postsThunk';
import { sub } from "date-fns";

type TStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface IPosts {
  posts: any[];
  status: TStatus;
  error: null | Error;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  userId: string;
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
  postId: string;
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
        state = {
          posts: [action.payload.posts],
          status: action.payload.status,
          error: action.payload.error
        };
      },
      prepare(title: string, content: string, userId: string) {
        const newPost: IPost = {
          id: nanoid(),
          title,
          content,
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
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { postAdded, reactionAdded } = postsSlice.actions;