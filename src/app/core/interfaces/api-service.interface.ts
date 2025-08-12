import { Observable } from "rxjs";
import { DataActionModel } from "@models/common/data-action.model";

export interface ApiServiceInterface<T> {
  search$(action: DataActionModel<T>): Observable<T[]>;
  searchOne$(action: DataActionModel<T>): Observable<T>;
  create$(action: DataActionModel<T>): Observable<T>;
  update$(action: DataActionModel<T>): Observable<T>;
  delete$(action: DataActionModel<T>): Observable<T>;
  getToken$(expired: boolean): Observable<string>;
}
