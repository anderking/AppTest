import { DataActionModel } from "@models/common/data-action.model";
import { LoginFormModel, CurrentUserModel } from "@models/auth/current-user.model";
import { createAction, props } from "@ngrx/store";

export const login = createAction("[Auth] login Auth", props<{ action: DataActionModel<LoginFormModel> }>());

export const loginSucess = createAction("[Auth] loginSucess Auth", props<{ userAuth: CurrentUserModel }>());

export const setCurrentUser = createAction("[Auth] setCurrentUser Auth", props<{ currentUser: CurrentUserModel }>());

export const reset = createAction("[Auth] reset Auth");

export const resetLoading = createAction("[Auth] resetLoading Auth");
