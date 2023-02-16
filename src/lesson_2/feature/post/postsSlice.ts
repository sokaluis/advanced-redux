import { PayloadAction } from "./../../../../node_modules/@reduxjs/toolkit/src/createAction";
import { createSlice, nanoid } from '@reduxjs/toolkit';

export interface IPost {
  id: string;
  title: string;
  content: string;
}

const initialState: IPost[] = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard good things.",
    // date: sub(new Date(), { minutes: 10 }).toISOString(),
    // reactions: {
    //   thumbsUp: 0,
    //   wow: 0,
    //   heart: 0,
    //   rocket: 0,
    //   coffee: 0
    // }
  },
  {
    id: '2',
    title: 'Slices...',
    content: "The more I say slice, the more I want pizza.",
    // date: sub(new Date(), { minutes: 5 }).toISOString(),
    // reactions: {
    //   thumbsUp: 0,
    //   wow: 0,
    //   heart: 0,
    //   rocket: 0,
    //   coffee: 0
    // }
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
      prepare(title: string, content: string) {
        const newPost: IPost = {
          id: nanoid(),
          title,
          content,
        };
        return {
          payload: newPost
        };
      },
    }
  }
});

// Action creators are generated for each case reducer function
export const { postAdded } = postsSlice.actions;