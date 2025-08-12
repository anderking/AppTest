import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import * as actions from "@store/configuration/actions/product.actions";
import * as notificationActions from "@store/shared/actions/notification.actions";
import { ProductModel } from "@models/configurations/product.model";
import { ApiService } from "@services/api.service";
/**
 * Efecto para escuchar acciones de la entidad
 */
@Injectable()
export class ProductEffects {
  /**
   * Efecto que escucha la acción de buscar todos los registros de la entidad
   */
  search$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.searchApi),
      switchMap((params) =>
        this.apiService.search$(params.props).pipe(
          switchMap((response: ProductModel[]) => {
            const items = response;
            return [actions.setAll({ items })];
          }),
          catchError((error) => of(notificationActions.setError({ error }), actions.resetLoading()))
        )
      )
    )
  );

  /**
   * Efecto que escucha la acción de buscar todos los registros de la entidad
   */
  searchOne$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.searchOneApi),
      switchMap((params) =>
        this.apiService.searchOne$(params.props).pipe(
          switchMap((response: ProductModel) => {
            const item = response;
            return [actions.setOne({ item })];
          }),
          catchError((error) => of(notificationActions.setError({ error }), actions.resetLoading()))
        )
      )
    )
  );

  /**
   * Efecto que escucha la acción de crear nuevos registros de la entidad
   */
  create$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.createApi),
      switchMap((params) =>
        this.apiService.create$(params.props).pipe(
          switchMap((response: ProductModel) => {
            const item = response;
            let message = "Registro agregado exitosamente";
            const payload: any = params.props.payload;
            if (payload.id) {
              message = "Registro actualizado exitosamente";
            }
            return [actions.addOne({ item }), notificationActions.setMessage({ message })];
          }),
          catchError((error) => of(notificationActions.setError({ error }), actions.resetLoading()))
        )
      )
    )
  );

  /**
   * Efecto que escucha la acción de crear nuevos registros de la entidad
   */
  update$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.updateApi),
      switchMap((params) =>
        this.apiService.update$(params.props).pipe(
          switchMap((response: ProductModel) => {
            const item = response;
            const message = "Registro actualizado exitosamente";
            return [actions.upsertOne({ item }), notificationActions.setMessage({ message })];
          }),
          catchError((error) => of(notificationActions.setError({ error }), actions.resetLoading()))
        )
      )
    )
  );

  /**
   * Efecto que escucha la acción de eliminar un registro de la entidad
   */
  delete$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actions.deleteApi),
      switchMap((params) =>
        this.apiService.delete$(params.props).pipe(
          switchMap((response: ProductModel) => {
            const id = response.id;
            const message = "Registro eliminado exitosamente";
            return [actions.removeOne({ id }), notificationActions.setMessage({ message })];
          }),
          catchError((error) => of(notificationActions.setError({ error }), actions.resetLoading()))
        )
      )
    )
  );

  /**
   * Se manejan los inyecciones de acciones y modelos que se necesitan en el efecto.
   * @param _actions$ Contiene la librería de acciones
   * @param apiService Contiene los servicios para conectar con Api
   */
  constructor(private _actions$: Actions, private apiService: ApiService<ProductModel | ProductModel[]>) {}
}
