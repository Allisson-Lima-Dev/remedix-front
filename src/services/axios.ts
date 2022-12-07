/* eslint-disable no-useless-computed-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from 'axios';
import router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from '~/error/AuthTokenError';
import { clearLocalStorage } from '~/utils/localStorageFormat';
import { UnauthorizedError } from '~/error/UnauthorizedError';

interface FailedRequestQueue {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError) => void;
}
const signOut = () => {
  destroyCookie(null, '@NeuralAnalyticsAccess_token', { path: '/' });
  destroyCookie(null, '@NeuralAnalyticsRefresh_token', { path: '/' });
  router.push('/login');
};

export function getAPIClient(ctx?: any) {
  const {
    ['@NeuralAnalyticsAccess_token']: access,
    ['@NeuralAnalyticsRefresh_token']: refresh,
  } = parseCookies(ctx);

  let isRefreshing = false;

  let failedRequestsQueue: Array<FailedRequestQueue> = [];

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  // 🚀 INTERCEPTOR DOS DADOS VINDOS DA API 🚀
  api.interceptors.response.use(
    (response) => {
      // Se ocorrer tudo certo.
      return response;
    },

    (error) => {
      // Guarda a requisição que deu erro
      const originalRequest = error.config;

      // 400 - Bad Request
      if (error.response.status === 401) {
        // Verifica se é token invalido, se for faz refresh
        if (error.response.data.code === 'token_not_valid') {
          if (!isRefreshing) {
            isRefreshing = true;

            return api
              .post('auth/refresh', { refresh }) // -> refresh token 🚀
              .then((res) => {
                setCookie(
                  null,
                  '@NeuralAnalyticsAccess_token',
                  res.data.access,
                  {
                    maxAge: 60 * 60 * 1, // 1hour
                    path: '/',
                  }
                );
                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(res.data.access)
                );
                failedRequestsQueue = [];
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) =>
                  request.onFailure(err)
                );
                failedRequestsQueue = [];
                clearLocalStorage();
                signOut();
                process.browser
                  ? signOut() // logout user signOut()
                  : Promise.reject(new AuthTokenError());
              })
              .finally(() => {
                isRefreshing = false;
              });
          }
          // Adiciona requisições a fila para assim que for realizado o refresh
          // elas serem chamadas.
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(api(originalRequest));
              },
              onFailure: (err) => {
                reject(err);
              },
            });
          });
        }
      }

      // 400 - Bad Request

      if (error.response.status === 401) {
        clearLocalStorage();
        signOut();
        return Promise.reject(error);
      }

      // Error Request
      if ([401, 403, 404, 405, 408].includes(error.response.status)) {
        clearLocalStorage();
        typeof window === 'undefined'
          ? signOut() // logout user signOut()
          : Promise.reject(new AuthTokenError());
      }

      return Promise.reject(error);
    }
  );

  api.interceptors.request.use((config) => {
    return config;
  });

  if (access) {
    api.defaults.headers.common.Authorization = `Bearer ${access}`;
  }

  return api;
}
