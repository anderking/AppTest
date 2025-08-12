import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { DataActionModel } from "@models/common/data-action.model";
import { environment } from "@environments/environment";
import { ApiServiceInterface } from "@interfaces/api-service.interface";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { AuthService } from "./auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class ApiService<T> implements ApiServiceInterface<T> {
  private url = environment.apiUrl;
  private urlAuth = environment.apiAuthUrl;

  constructor(private _http: HttpClient, private authService: AuthService) {}

  /**
   * Servicio que se usa para comunicar la api back por get
   * @param action Contiene el body DataActionModel
   */
  search$(action: DataActionModel<T>): Observable<T[]> {
    const endPoint = this.url + action.url;
    return this._http.get<T[]>(endPoint).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          throw new Error("No se encontraron resultados");
        }
      })
    );
  }

  /**
   * Servicio que se usa para comunicar la api back y obtener un solo registro
   * @param action Contiene el body DataActionModel
   */
  searchOne$(action: DataActionModel<T>): Observable<T> {
    const endPoint = this.url + action.url;
    return this._http.get<T>(endPoint).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          throw new Error("No se encontró el registro");
        }
      })
    );
  }

  /**
   * Servicio que se usa para comunicar la api back para save
   * @param action Contiene el body DataActionModel
   */
  create$(action: DataActionModel<T>): Observable<T> {
    const endPoint = this.url + action.url;
    return this._http.post<T>(endPoint, action.payload).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          throw new Error("Error al crear el registro");
        }
      })
    );
  }

  /**
   * * Servicio que se usa para comunicar la api back para update
   * @param action Contiene el body DataActionModel
   */
  update$(action: DataActionModel<T>): Observable<T> {
    const endPoint = this.url + action.url;
    return this._http.patch<T>(endPoint, action.payload).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          throw new Error("Error al actualizar el registro");
        }
      })
    );
  }

  /**
   * Servicio que se usa para comunicar la api back para delete
   * @param action Contiene el body DataActionModel
   */
  delete$(action: DataActionModel<T>): Observable<T> {
    const endPoint = `${this.url}${action.url}`;
    return this._http.delete<T>(endPoint).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          throw new Error("Error al eliminar el registro");
        }
      })
    );
  }

  getToken$(): Observable<string> {
    return this.authService.getToken$();
  }

  /**
   * Servicio que se usa para comunicar la api back para save
   * @param action Contiene el body DataActionModel
   */
  login$(action: DataActionModel<T>): Observable<CurrentUserModel> {
    const endPoint = this.urlAuth + action.url;
    return this._http.post<CurrentUserModel>(endPoint, action.payload).pipe(
      map((data) => {
        if (data.accessToken) {
          return data;
        } else {
          throw new Error("No se pudo obtener el token");
        }
      })
    );
  }
}
