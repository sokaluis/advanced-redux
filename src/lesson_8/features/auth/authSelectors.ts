import { createSelector } from "@reduxjs/toolkit";
import { storeStates } from "../../app/stores";

export const selectCurrentUser = createSelector(storeStates, (state) => state.auth.user);
export const selectCurrentToken = createSelector(storeStates, (state) => state.auth.accessToken);