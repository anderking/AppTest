import { Action, createReducer, on } from "@ngrx/store";
import { CurrentUserModel } from "@models/auth/current-user.model";
import * as actions from "../actions/auth.actions";

/** Se declara la interface del reducer */
export interface State {
  currentUser: CurrentUserModel;
  loading: boolean;
}

/** Inicializamos el state */
export const initialState: State = {
  currentUser: null,
  loading: false
};

/** Definimos todos los escucha por cada accion para efectuar un reducer conectado al store a traves del adapter */
const entityReducer = createReducer(
  initialState,

  on(actions.login, (state) => ({
    ...state,
    loading: true
  })),

  on(actions.loginSucess, (state, { userAuth }) => ({
    ...state,
    currentUser: userAuth,
    loading: false
  })),

  on(actions.reset, (state) => {
    return {
      ...state,
      currentUser: null,
      loading: false
    };
  }),

  on(actions.resetLoading, (state) => {
    return {
      ...state,
      loading: false
    };
  })
);

/** Se exporta la funcion reducer que contiene  el store */
export function reducer(state: State | undefined, action: Action) {
  return entityReducer(state, action);
}
