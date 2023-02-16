import { createSelector } from "@reduxjs/toolkit";
import { stateSelect } from "../../app/store";

export const counterSelector = createSelector(stateSelect, state => state.counter);