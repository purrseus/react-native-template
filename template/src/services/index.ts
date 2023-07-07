/* eslint-disable @typescript-eslint/no-explicit-any */
import { PromiseObj } from '@core/interfaces';
import { useAuthStore } from '@stores';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from 'react-native-config';

type OriginalRequest = AxiosRequestConfig & { retry?: boolean };

let isTokenRefreshing = false;

const UNAUTHORIZED_STATUS = 401;

const promiseQueue: PromiseObj<string>[] = [];

const handlePromiseQueue = async (accessToken?: string, error?: any) => {
  if (promiseQueue.isEmpty) return;

  for (const promise of promiseQueue) {
    if (accessToken && !error) {
      promise.resolve(accessToken);
    } else {
      promise.reject(error);
    }
  }

  promiseQueue.length = 0;
};

const handleRefreshToken = async () => {
  const response = await axios.post<AxiosResponse<{ accessToken?: string }>>(
    `${Config.API_URL}/auth/refresh-token`,
    { refreshToken: useAuthStore.getState().refreshToken },
  );

  return response.data.accessToken;
};

const axiosInstance = axios.create({
  baseURL: Config.API_URL,
  timeout: 10_000,
});

const setDefaultAccessToken = (accessToken: string | null) => {
  !accessToken
    ? delete axiosInstance.defaults.headers.common.Authorization
    : (axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`);
};

axiosInstance.interceptors.request.use(
  config => config,
  requestError => Promise.reject(requestError),
);

axiosInstance.interceptors.response.use(
  response => response.data,
  async responseError => {
    const originalRequest: OriginalRequest = responseError.config;
    const isUnauthorized = responseError?.response?.status === UNAUTHORIZED_STATUS;

    const shouldHandleToken =
      isUnauthorized && !!originalRequest.headers && !originalRequest?.retry;

    if (!shouldHandleToken || !originalRequest.headers) return Promise.reject(responseError);

    // Use accessToken from global state if originalRequest.headers.Authorization is undefined
    if (!originalRequest.headers.Authorization) {
      const accessToken = useAuthStore.getState().accessToken;
      if (accessToken) {
        setDefaultAccessToken(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    // Handle requests while refreshing accessToken
    if (isTokenRefreshing) {
      try {
        const accessToken = await new Promise<string>((resolve, reject) => {
          promiseQueue.push({ resolve, reject });
        });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    // Refresh accessToken
    try {
      isTokenRefreshing = true;
      originalRequest.retry = true;
      const accessToken = await handleRefreshToken();
      if (!accessToken) throw new Error('');

      useAuthStore.getState().setTokens({ accessToken });
      setDefaultAccessToken(accessToken);
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return axiosInstance(originalRequest).finally(() => handlePromiseQueue(accessToken));
    } catch (error) {
      useAuthStore.getState().clearTokens();
      setDefaultAccessToken(null);
      handlePromiseQueue(undefined, error);

      return Promise.reject(error);
    } finally {
      isTokenRefreshing = false;
    }
  },
);

export default axiosInstance;
