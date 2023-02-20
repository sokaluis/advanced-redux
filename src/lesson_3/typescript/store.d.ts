import { TStatus } from './types';

export interface AsyncExtendMatcher<TState extends { status: TStatus; }> {
  pendingMatcher: (action: { type: string; }) => boolean;
  pendingReducer: (state: TState, action: { type: string; }) => void;
  rejectedMatcher: (action: { type: string; }) => boolean;
  rejectedReducer: (state: TState, action: { type: string; error: { message: string; }; }) => void;
}

export interface AsyncMatcher<TState, TPayload> extends AsyncExtendMatcher<TState> {
  matcher: (action: { type: string; }) => boolean;
  reducer: (state: TState, action: { type: string; payload: TPayload; }) => void;
}