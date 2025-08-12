import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { DataActionModel } from "@models/common/data-action.model";
import { ProductModel } from "@models/configurations/product.model";

/** Acciones para gestionar el backend */

/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener todos los registros de la entidad */
export const searchApi = createAction(
  "[Product/API] searchApi Products",
  props<{ props: DataActionModel<ProductModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para obtener un registro de la entidad */
export const searchOneApi = createAction(
  "[Product/API] searchOneApi Product",
  props<{ props: DataActionModel<ProductModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para crear un nuevo registro de la entidad */
export const createApi = createAction(
  "[Product/API] createApi Product",
  props<{ props: DataActionModel<ProductModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para actualizar un registro de la entidad */
export const updateApi = createAction(
  "[Product/API] updateApi Product",
  props<{ props: DataActionModel<ProductModel> }>()
);
/** Dispara la acción que hace el llamado a la api a traves del efecto para borrar un registro de la entidad */
export const deleteApi = createAction(
  "[Product/API] deleteApi Product",
  props<{ props: DataActionModel<ProductModel> }>()
);
/** setAll: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>y reemplaza todas las entidades existentes con los valores de la matriz. */
export const setAll = createAction(
  "[Product/API] setAll Products",
  props<{ items: ProductModel[] }>()
);
/** setOne: acepta una sola entidad y la agrega o reemplaza */
export const setOne = createAction(
  "[Product/API] setOne Product",
  props<{ item: ProductModel }>()
);
/** addOne: acepta una sola entidad y la agrega si aún no está presente. */
export const addOne = createAction(
  "[Product/API] addOne Product",
  props<{ item: ProductModel }>()
);
/** addMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>, y los agrega si aún no están presentes. */
export const addMany = createAction(
  "[Product/API] addMany Products",
  props<{ items: ProductModel[] }>()
);
/** updateOne: acepta un "objeto de actualización" que contiene un ID de entidad y un objeto que contiene uno o más valores de campo nuevos para actualizar dentro de un changescampo y realiza una actualización superficial en la entidad correspondiente. */
export const updateOne = createAction(
  "[Product/API] updateOne Product",
  props<{ item: Update<ProductModel> }>()
);
/** updateMany: acepta una matriz de objetos de actualización y realiza actualizaciones superficiales en todas las entidades correspondientes. */
export const updateMany = createAction(
  "[Product/API] updateMany Products",
  props<{ items: Update<ProductModel>[] }>()
);
/** upsertOne: acepta una sola entidad. Si existe una entidad con esa ID, realizará una actualización superficial y los campos especificados se fusionarán con la entidad existente, y los campos coincidentes sobrescribirán los valores existentes. Si la entidad no existe, se agregará. */
export const upsertOne = createAction(
  "[Product/API] upsertOne Product",
  props<{ item: ProductModel }>()
);
/** upsertMany: acepta una matriz de entidades o un objeto con la forma de Record<EntityId, T>que se alterará superficialmente. * */
export const upsertMany = createAction(
  "[Product/API] upsertMany Products",
  props<{ items: ProductModel[] }>()
);
/** removeOne: acepta un único valor de ID de entidad y elimina la entidad con ese ID, si existe. */
export const removeOne = createAction(
  "[Product/API] removeOne Product",
  props<{ id: string }>()
);
/** removeMany: acepta una matriz de valores de ID de entidad y elimina cada entidad con esos ID, si existen. */
export const removeMany = createAction(
  "[Product/API] removeMany Products",
  props<{ ids: string[] }>()
);
/** Esta acción permite setear el registro actual a traves del identificador */
export const setCurrentItemId = createAction(
  "[Product/API] setCurrentItemId Product",
  props<{ id: string }>()
);
/** Esta acción permite resetear el registro actual del store */
export const resetSelected = createAction(
  "[Product/API] resetSelected Product"
);
/** Esta acción permite resetear  el sotre de la entidad */
export const reset = createAction("[Product/API] reset Products");
/** Esta acción permite limpiar el loading del store */
export const resetLoading = createAction(
  "[Product/API] resetLoading Product"
);
