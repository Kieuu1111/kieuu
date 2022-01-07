import axios from 'axios';
import { defaultProductValue, TProduct } from '../models/product_model';
import { IndexedObject } from '../utils/type';
import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import {
  ICrudDeleteAction,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
} from '../type/redux-action';
import { cleanEntity } from '../utils/object';

export const ACTION_TYPES = {
  GET_PRODUCTS: 'products/GET_PRODUCTS',
  GET_PRODUCT: 'products/GET_PRODUCT',
  RESET: 'products/RESET',
  DELETE_PRODUCT: 'products/DELETE_PRODUCT',
  UPDATE_PRODUCT: 'products/UPDATE_PRODUCT',
  CREATE_PRODUCT: 'products/CREATE_PRODUCT',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as TProduct[],
  entity: defaultProductValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ProductState = Readonly<typeof initialState>;

// Reducer

export default (state: ProductState = initialState, action: IndexedObject): ProductState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_PRODUCTS):
    case REQUEST(ACTION_TYPES.GET_PRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODUCT):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUCT):
    case REQUEST(ACTION_TYPES.DELETE_PRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.GET_PRODUCTS):
    case FAILURE(ACTION_TYPES.GET_PRODUCT):
    case FAILURE(ACTION_TYPES.CREATE_PRODUCT):
    case FAILURE(ACTION_TYPES.UPDATE_PRODUCT):
    case FAILURE(ACTION_TYPES.DELETE_PRODUCT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };

    case SUCCESS(ACTION_TYPES.GET_PRODUCTS):
      return {
        ...state,
        entity: defaultProductValue,
        updating: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.GET_PRODUCT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODUCT):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUCT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODUCT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: defaultProductValue,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = '/products1';

export const getAllProducts: ICrudGetAllAction<TProduct> = () => {
  return {
    type: ACTION_TYPES.GET_PRODUCTS,
    payload: axios.get<TProduct>(apiUrl),
  };
};
export const getEntity: ICrudGetAction<TProduct> = (id) => {
  return {
    type: ACTION_TYPES.GET_PRODUCT,
    payload: axios.get<TProduct>(`/products1/${id}`),
  };
};

export const createEntity: ICrudPutAction<TProduct> = (entity) => async (dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODUCT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getAllProducts());
  return result;
};

export const updateEntity: ICrudPutAction<TProduct> = (entity) => async (dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUCT,
    payload: axios.put(`${apiUrl}/${entity?.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<TProduct> = (id) => async (dispatch) => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODUCT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getAllProducts());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
