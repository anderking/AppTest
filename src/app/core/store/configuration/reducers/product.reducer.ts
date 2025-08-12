import { Action, createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { ProductModel } from "@models/configurations/product.model";
import * as actions from "@store/configuration/actions/product.actions";

/** Se declara la interface del reducer */
export interface State extends EntityState<ProductModel> {
  selectCurrentId: string | null;
  loading: boolean;
}
/** El adapter es como el puente entre el estore y el reducer */
export const adapter: EntityAdapter<ProductModel> =
  createEntityAdapter<ProductModel>();

/** Inicializamos el state */
export const initialState: State = adapter.getInitialState({
  selectCurrentId: null,
  loading: false,
});

/** Definimos todos los escucha por cada accion para efectuar un reducer conectado al store a traves del adapter */
const entityReducer = createReducer(
  initialState,
  on(actions.searchApi, (state) => ({ ...state, loading: true })),
  on(actions.setAll, (state, { items }) => {
    return adapter.setAll(items, { ...state, loading: false });
  }),

  on(actions.searchOneApi, (state) => ({
    ...state,
    loading: true,
  })),
  on(actions.setOne, (state, { item }) => {
    return adapter.setOne(item, { ...state, loading: false });
  }),

  on(actions.createApi, (state) => ({ ...state, loading: true })),
  on(actions.addOne, (state, { item }) => {
    return adapter.addOne(item, { ...state, loading: false });
  }),

  on(actions.addMany, (state, { items }) => {
    return adapter.addMany(items, { ...state, loading: false });
  }),

  on(actions.updateApi, (state) => ({ ...state, loading: true })),
  on(actions.updateOne, (state, { item }) => {
    return adapter.updateOne(item, { ...state, loading: false });
  }),
  on(actions.updateMany, (state, { items }) => {
    return adapter.updateMany(items, { ...state, loading: false });
  }),

  on(actions.upsertOne, (state, { item }) => {
    return adapter.upsertOne(item, { ...state, loading: false });
  }),
  on(actions.upsertMany, (state, { items }) => {
    return adapter.upsertMany(items, { ...state, loading: false });
  }),

  on(actions.deleteApi, (state) => ({ ...state, loading: true })),
  on(actions.removeOne, (state, { id }) => {
    return adapter.removeOne(id, { ...state, loading: false });
  }),
  on(actions.removeMany, (state, { ids }) => {
    return adapter.removeMany(ids, { ...state, loading: false });
  }),

  on(actions.setCurrentItemId, (state, { id }) => {
    return { ...state, selectCurrentId: id };
  }),

  on(actions.resetSelected, (state) => {
    return { ...state, selectCurrentId: null };
  }),
  on(actions.reset, (state) => {
    return adapter.removeAll({
      ...state,
      selectCurrentId: null,
    });
  }),
  on(actions.resetLoading, (state) => {
    return { ...state, loading: false };
  })
);

/** Se exporta la funcion reducer que contiene  el store */
export function reducer(state: State | undefined, action: Action) {
  return entityReducer(state, action);
}

/** Se definen todas las variables que queremos manejar en el store respecto a la entidad */
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
/** Esta variable contiene el identificador de un item actual */
export const selectCurrentId = (state: State) => state.selectCurrentId;
