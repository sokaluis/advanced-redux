import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  counter: 10
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, /* action */) => {
      state.counter += 1;
    },
    decrement: (state, /* action */) => {
      state.counter -= 1;
    },
    incrementByAmount: (state, action) => {
      state.counter += action.payload;
    },
    reset: (state) => {
      state.counter = initialState.counter;
    }
  }
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;