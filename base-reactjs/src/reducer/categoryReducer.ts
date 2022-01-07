import axios from 'axios';
import { defaultCateValue, TCategory } from '../models/category_model';
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
  GET_CATEGORIES: 'categories/GET_CATEGORIES',
  GET_CATEGORY: 'categories/GET_CATEGORY',
  RESET: 'categories/RESET',
  DELETE_CATEGORY: 'categories/DELETE_CATEGORY',
  UPDATE_CATEGORY: 'categories/UPDATE_CATEGORY',
  CREATE_CATEGORY: 'categories/CREATE_CATEGORY',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as TCategory[],
  entity: defaultCateValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type CategoryState = Readonly<typeof initialState>;

// Reducer

export default (state: CategoryState = initialState, action: IndexedObject): CategoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_CATEGORIES):
    case REQUEST(ACTION_TYPES.GET_CATEGORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CATEGORY):
    case REQUEST(ACTION_TYPES.UPDATE_CATEGORY):
    case REQUEST(ACTION_TYPES.DELETE_CATEGORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.GET_CATEGORIES):
    case FAILURE(ACTION_TYPES.GET_CATEGORY):
    case FAILURE(ACTION_TYPES.CREATE_CATEGORY):
    case FAILURE(ACTION_TYPES.UPDATE_CATEGORY):
    case FAILURE(ACTION_TYPES.DELETE_CATEGORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };

    case SUCCESS(ACTION_TYPES.GET_CATEGORIES):
      return {
        ...state,
        updating: false,
        entity: defaultCateValue,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.GET_CATEGORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CATEGORY):
    case SUCCESS(ACTION_TYPES.UPDATE_CATEGORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CATEGORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: defaultCateValue,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = '/categories2';

export const getAllCategories: ICrudGetAllAction<TCategory> = () => {
  return {
    type: ACTION_TYPES.GET_CATEGORIES,
    payload: axios.get<TCategory>(apiUrl),
  };
};
export const getEntity: ICrudGetAction<TCategory> = (id) => {
  return {
    type: ACTION_TYPES.GET_CATEGORY,
    payload: axios.get<TCategory>(`/categories2/${id}`),
  };
};

export const createEntity: ICrudPutAction<TCategory> = (entity) => async (dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CATEGORY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getAllCategories());
  return result;
};

export const updateEntity: ICrudPutAction<TCategory> = (entity) => async (dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CATEGORY,
    payload: axios.put(`${apiUrl}/${entity?.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<TCategory> = (id) => async (dispatch) => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CATEGORY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getAllCategories());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
