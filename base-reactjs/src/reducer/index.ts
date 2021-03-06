import { applyMiddleware, combineReducers, compose, createStore, Middleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import errorMiddleware from '../application/config/error-middleware';
import loggerMiddleware from '../application/config/logger-middleware';
import authenReducer, { AuthenticationState } from './authenReducer';
import fliRegisterReducer, { RegisterState } from './registerReducer';
import langReducer, { LangState } from './languageReducer';
import productReducer, { ProductState } from './productReducer';
import categoryReducer, { CategoryState } from './categoryReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export type AppState = {
  authentication: AuthenticationState;
  register: RegisterState;
  language: LangState;
  product: ProductState;
  category: CategoryState;
};

const defaultMiddlewares = [thunkMiddleware, errorMiddleware, promiseMiddleware, loggerMiddleware];
const composedMiddlewares = (middlewares: Middleware[]) =>
  compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const rootReducer = combineReducers<AppState>({
  authentication: authenReducer,
  register: fliRegisterReducer,
  product: productReducer,
  language: langReducer,
  category: categoryReducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const peristedState = loadState();

const initialize = (initialState?: AppState, middlewares = []): Store =>
  createStore(rootReducer, initialState, composeWithDevTools(composedMiddlewares(middlewares)));

const store = initialize(peristedState);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
