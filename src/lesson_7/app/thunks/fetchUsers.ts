import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncBasicMatcher, JSONUsers } from "../../typescript";
import { IUsersState } from '../../features/users/userSlice';

interface IFetchUserMatcher extends AsyncBasicMatcher<IUsersState, JSONUsers[]> { }

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsersThunk = createAsyncThunk('users/fetchUsers', async (): Promise<JSONUsers[] | string> => {
  try {
    const response = await axios.get(USERS_URL);
    return [...response.data];
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return errorMessage;
  }
});

export const fetchUsersMatcher: IFetchUserMatcher = {
  matcher: (action) => {
    return action.type === fetchUsersThunk.fulfilled.type;
  },
  reducer(state, { payload }) {
    state.loading = 'succeeded';
    state.users = payload;
    state.error = null;
  },
}

