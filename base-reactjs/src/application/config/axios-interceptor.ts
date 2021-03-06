import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Func } from '../../type/types';
import { IndexedObject } from '../../utils/type';

export type Params = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
  search?: string;
};

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = 'https://test-heroku444.herokuapp.com';

const setupAxiosInterceptors = (onUnauthenticated: Func) => {
  const onRequestSuccess = (config: AxiosRequestConfig) => {
    const token = ''; //.get('authenticationToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // config.withCredentials = false;
    config.headers['Content-Type'] = 'application/json';
    config.headers.post['Access-Control-Allow-Origin'] = '*';
    return config;
  };
  const onResponseSuccess = (response: AxiosResponse) => response;
  const onResponseError = (err: IndexedObject) => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
