import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { CurrentUserModel, LoginFormModel } from "@models/auth/current-user.model";
import * as actions from "@store/auth/actions/auth.actions";
import * as notificationActions from "@store/shared/actions/notification.actions";
import { ApiService } from "@services/api.service";

@Injectable()
export class AuthEffects {
  constructor(private _actions$: Actions, private apiService: ApiService<LoginFormModel | LoginFormModel[]>) {}

  login$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.login),
      switchMap(({ action }) =>
        this.apiService.login$(action).pipe(
          map((userAuth: CurrentUserModel) => {
            return actions.loginSucess({ userAuth });
          }),
          catchError((error) => of(notificationActions.setError({ error }), actions.resetLoading()))
        )
      )
    );
  });
}
