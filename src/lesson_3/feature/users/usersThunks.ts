import { createAsyncThunk } from "@reduxjs/toolkit";
import { JSONUsers } from "../typescript/types";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (): Promise<JSONUsers[] | string> => {
  try {
    const response = await axios.get(USERS_URL);
    return [...response.data];
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return errorMessage;
  }
});