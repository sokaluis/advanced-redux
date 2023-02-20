import { AsyncExtendMatcher, TError, TStatus } from "../typescript";

interface IExtendedMatcher {
  pending: {
    type: string;
  };
  rejected: {
    type: string;
  };
}

export const extendedMatcher = <TState extends { status: TStatus, error: TError; }, T extends IExtendedMatcher>(thunk: T): AsyncExtendMatcher<TState> => {
  return {
    pendingMatcher: (action) => action.type === thunk.pending.type,
    pendingReducer: (state) => {
      state.status = 'loading';
    },
    rejectedMatcher: (action) => action.type === thunk.rejected.type,
    rejectedReducer: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  };
};