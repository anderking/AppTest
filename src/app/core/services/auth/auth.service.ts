import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of } from "rxjs";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { encrypted } from "@root/core/utilities/crypto-utils";
import { clearLocalStorage, getCurrentUserDecrypt } from "@root/core/utilities/core.utilities";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly _authFacadeService = inject(AuthFacadeService);
  public paramsToLoginTime = new BehaviorSubject<CurrentUserModel>(null);
  private urlAuth = environment.apiAuthUrl;

  constructor(private http: HttpClient) {}

  /**
   * Setea el subject
   * @param {CurrentUserModel} value es un boleano
   */
  set theParamsToLoginTime(value: CurrentUserModel) {
    this.paramsToLoginTime.next(value);
  }

  /**
   * Cierra la sesion, borra el localStorage y borra el store
   */
  public logout(): void {
    this._authFacadeService.reset();
    clearLocalStorage();
  }

  /**
   * Escucha los cambios del currentUser desde FireBase
   */
  public initAuthListener$(): Observable<boolean> {
    const currentUser: CurrentUserModel = getCurrentUserDecrypt();
    const accessToken = currentUser?.accessToken;

    if (!accessToken) {
      return of(false);
    }

    console.log(accessToken)

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    });

    return this.http.get<any>(`${this.urlAuth}auth/me`, { headers }).pipe(
      map((response) => {
        console.log("Usuario autenticado:", response);
        return true;
      }),
      catchError((error) => {
        console.error("No autenticado o error:", error);
        return of(false);
      })
    );
  }

  /**
   * Setea el currentUser en el localStorage de forma encriptada
   * @param currentUser Contiene el usuario actual en sesión
   */
  public setCurrentUserEncrypt(currentUser: CurrentUserModel): void {
    const textToEncrypt = JSON.stringify(currentUser).trim();
    const cookieEncrypt = encrypted(textToEncrypt);
    localStorage.setItem("currentUser", cookieEncrypt);
    const actualRoute = window.location.origin;
    window.location.replace(actualRoute + "/authenticated/product");
  }

  /**
   * Retorna el token de sesion
   */
  public getToken$(): Observable<string> {
    const currentUser: CurrentUserModel = getCurrentUserDecrypt();
    return currentUser ? of(currentUser.accessToken) : null;
  }
}
