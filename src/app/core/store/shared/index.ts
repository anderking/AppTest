import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from "@ngrx/store";
import { notificationReducer } from "@store/shared/reducers";

export const sharedFeatureKey = "shared";

export interface SharedState {
  notification: notificationReducer.State;
}

export const reducers: ActionReducerMap<SharedState> = {
  notification: notificationReducer.reducer,
};

export const getSharedState =
  createFeatureSelector<SharedState>(sharedFeatureKey);

export const getNotification = createSelector(
  getSharedState,
  (state: SharedState) => state.notification
);
