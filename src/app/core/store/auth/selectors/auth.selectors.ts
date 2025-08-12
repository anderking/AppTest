import { createSelector } from "@ngrx/store";
import { getLogin } from "..";

export const selectCurrentUser = createSelector(getLogin, (state) => state.currentUser);

export const selectLoading = createSelector(getLogin, (state) => state.loading);
