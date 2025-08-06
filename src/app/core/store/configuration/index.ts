import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from "@ngrx/store";
import { productReducer } from "@store/configuration/reducers";

export const configurationFeatureKey = "configuration";

export interface ConfigurationState {
  product: productReducer.State;
}

export const reducers: ActionReducerMap<ConfigurationState> = {
  product: productReducer.reducer,
};

export const getConfigurationState = createFeatureSelector<ConfigurationState>(
  configurationFeatureKey
);

export const getProduct = createSelector(
  getConfigurationState,
  (state: ConfigurationState) => state.product
);
