import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginFormModel, CurrentUserModel } from "@models/auth/current-user.model";
import { DataActionModel } from "@models/common/data-action.model";
import { Store } from "@ngrx/store";
import * as selectors from "@store/auth/selectors/auth.selectors";
import * as actions from "@store/auth/actions/auth.actions";

@Injectable({
  providedIn: "root"
})
export class AuthFacadeService {
  /**
   * Se manejan los inyecciones de servicios que se necesitan en el facade.
   * @param _store Contiene sl Store global
   */
  constructor(private _store: Store) {}

  public login(payload: LoginFormModel): void {
    const action: DataActionModel<LoginFormModel> = {
      url: "auth/login",
      payload
    };

    const props = actions.login({
      action
    });
    this._store.dispatch(props);
  }

  public getCurrentUser$(): Observable<CurrentUserModel> {
    return this._store.select(selectors.selectCurrentUser);
  }

  public getLoading$(): Observable<boolean> {
    return this._store.select(selectors.selectLoading);
  }

  public reset(): void {
    const action = actions.reset();
    this._store.dispatch(action);
  }
}
