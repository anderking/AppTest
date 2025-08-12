import { createSelector } from "@ngrx/store";
import { getProduct } from "../index";
import * as fromProduct from "../reducers/product.reducer";

/** Exporta el array de identificadores de la entidad para el facade */
export const selectIds = createSelector(
  getProduct,
  fromProduct.selectIds // shorthand for clasificationsState => fromProduct.selectProductIds(clasificationsState)
);
/** Exporta el diccionario de todos los items de la entidad para el facade */
export const selectEntities = createSelector(
  getProduct,
  fromProduct.selectEntities
);
/** Exporta un array de todos los items de la entidad para el facade */
export const selectAll = createSelector(getProduct, fromProduct.selectAll);
/** Exporta el total de items en la entidad para el facade */
export const selectTotal = createSelector(
  getProduct,
  fromProduct.selectTotal
);
/** Exporta el identificador de un item actual para el facade */
export const selectCurrentId = createSelector(
  getProduct,
  fromProduct.selectCurrentId
);
/** Exporta el item actual para el facade */
export const selectCurrent = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, id) => (entities[id] ? entities[id] : null)
);
/** Exporta el loading para el facade */
export const selectLoading = createSelector(
  getProduct,
  (state) => state.loading
);
