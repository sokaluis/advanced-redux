import { PayloadAction } from "./../../../../node_modules/@reduxjs/toolkit/src/createAction";
import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

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

const initReactions: IReactions = {
  thumbsUp: 0,
  wow: 0,
  heart: 0,
  rocket: 0,
  coffee: 0
};

const initialState: IPost[] = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard good things.",
    userId: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: initReactions
  },
  {
    id: '2',
    title: 'Slices...',
    content: "The more I say slice, the more I want pizza.",
    userId: '1',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: initReactions
  }
];

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<IPost>) {
        state.push(action.payload);
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
        return {
          payload: newPost
        };
      },
    },
    reactionAdded: (state, action: PayloadAction<TReaction>) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const { postAdded, reactionAdded } = postsSlice.actions;