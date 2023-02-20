import { AsyncExtraMatchers, TError, TStatus } from "../typescript";

interface IExtendedMatcher {
  pending: {
    type: string;
  };
  rejected: {
    type: string;
  };
}

interface TStatusMatcher {
  status: TStatus;
  error: TError;
}

export const extendedMatcher = <TState extends TStatusMatcher, T extends IExtendedMatcher>(thunk: T): AsyncExtraMatchers<TState> => {
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