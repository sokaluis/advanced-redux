import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { JSONPosts } from "../typescript/types";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (): Promise<JSONPosts[] | string> => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return errorMessage;
  }
});