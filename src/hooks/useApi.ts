import { useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';

// Files
import { BASE_URL } from '../constants/api';
import { setToken, logOut } from '../redux/auth';
import { getUtcOffset } from '../utils/domUtils';

const getInstance = ({ token, logOut, customUrl, url, KeyId }: any) => {
  const instance = axios.create({
    baseURL: customUrl ? url : BASE_URL,
  });

  instance.interceptors.request.use(
    (config: any) => {
      // config.headers['UtcOffsetInSecond'] = getUtcOffset();
      if (KeyId !== 0) {
        config.headers['Content-Type'] = 'multipart/form-data';
        config.headers['KeyId'] = KeyId;
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
        // config.headers['AuthorizationToken'] = 'Bearer ' + tokens;
      }
      return config;
    },
    (error: any) => {
      Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response: any) {
      return response;
    },
    function (err: any) {
      const status = err.response?.status || 500;
      switch (status) {
        case 401: {
          // logOut();
          throw new Error(err.message);
        }

        // forbidden (permission related issues)
        case 403: {
          throw new Error(err.message);
        }

        // bad request
        case 400: {
          throw new Error(err.message);
        }

        // not found
        case 404: {
          throw new Error(err.message);
        }

        // conflict
        case 409: {
          throw new Error(err.message);
        }

        // unprocessable
        case 422: {
          throw new Error(err.message);
        }

        // generic api error (server related) unexpected
        default: {
          throw new Error(err.message);
        }
      }
    }
  );

  return instance;
};

const useApi = () => {
  const token = useSelector((state: any) => state.auth.token);
  const dispatch = useDispatch();

  const log_out = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  const set_token = useCallback(
    (data: any) => {
      dispatch(setToken(data));
    },
    [dispatch]
  );

  const apiCall = useCallback(
    async ({ KeyId = 0, customUrl = false, type, url, data, params = {} }: any) => {
      const instance = getInstance({
        token,
        set_token,
        log_out,
        customUrl,
        url,
        KeyId,
      });

      try {
        switch (type) {
          case 'POST': {
            let res = await instance.post(url, data, {
              params: params,
            });
            return res;
          }

          case 'PUT': {
            let res = await instance.put(url, data, {
              params: params,
            });
            return res;
          }

          case 'DELETE': {
            let res = await instance.delete(url, {});
            return res;
          }

          case 'GET': {
            let res = await instance.get(url);
            return res;
          }

          default: {
            let res = await instance.get(url);
            return res;
          }
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    [logOut, setToken, token]
  );

  return { apiCall };
};

export default useApi;
