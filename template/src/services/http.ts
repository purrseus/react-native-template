import { PromiseObject } from '@/core/interfaces';
import { useAuthStore } from '@/stores';
import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';
import { Alert } from 'react-native';
import Config from 'react-native-config';
import { ZodError, ZodTypeAny, z } from 'zod';

type OriginalRequest = (NonNullable<InternalAxiosRequestConfig> & { retry?: boolean }) | undefined;

export default class Http extends Axios {
  private isTokenRefreshing = false;
  private readonly refreshTokenUrl = '/auth/refresh-token';
  private readonly promiseQueue: PromiseObject<string>[] = [];

  constructor(requestConfig?: AxiosRequestConfig) {
    // @ts-ignore
    super(axios.mergeConfig(axios.defaults, requestConfig));
    this.defaults.timeout = 10000;
    this.setAuthorizationHeader(useAuthStore.getState().accessToken);

    useAuthStore.subscribe(state => this.setAuthorizationHeader(state.accessToken));

    this.useRequestInterceptor();
    this.useResponseInterceptor();
  }

  private setAuthorizationHeader(token?: string | null): void {
    if (token) this.defaults.headers.common.Authorization = this.createBearerToken(token);
    else delete this.defaults.headers.common.Authorization;
  }

  private useRequestInterceptor(): void {
    this.interceptors.request.use(
      config => config,
      (requestError: AxiosError) => Promise.reject(requestError),
    );
  }

  private useResponseInterceptor(): void {
    this.interceptors.response.use(
      response => response,
      async (responseError: AxiosError) => {
        const { config, response } = responseError;

        const originalRequest = config as OriginalRequest;
        const isUnauthorized = response?.status === HttpStatusCode.Unauthorized;

        const shouldHandleToken =
          isUnauthorized && !!originalRequest?.headers?.Authorization && !originalRequest?.retry;

        const refreshTokenFailed = config?.url === this.refreshTokenUrl;

        if (refreshTokenFailed || !shouldHandleToken) return Promise.reject(responseError);

        // Handle requests while refreshing accessToken
        if (this.isTokenRefreshing) {
          try {
            const accessToken = await new Promise<string>((resolve, reject) => {
              this.promiseQueue.push({ resolve, reject });
            });

            this.handleOriginalRequestBeforeRetry(originalRequest, accessToken);
            return this.request(originalRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }

        // Refresh accessToken
        const { refreshToken, setTokens, clearTokens } = useAuthStore.getState();
        try {
          if (!refreshToken) throw new Error();

          this.isTokenRefreshing = true;

          const refreshTokenResponse = await this.post<{ accessToken?: string }>(
            this.refreshTokenUrl,
            { refreshToken },
          );

          const accessToken = refreshTokenResponse.data.accessToken;
          if (!accessToken) throw new Error();

          setTokens({ accessToken });
          this.handleOriginalRequestBeforeRetry(originalRequest, accessToken);

          return this.request(originalRequest).finally(() =>
            this.handlePromiseQueue({ accessToken }),
          );
        } catch (error) {
          clearTokens();
          this.handlePromiseQueue({ error });
          return Promise.reject(error);
        } finally {
          this.isTokenRefreshing = false;
        }
      },
    );
  }

  private createBearerToken(token: string): string {
    return `Bearer ${token}`;
  }

  private handleOriginalRequestBeforeRetry(
    originalRequest: NonNullable<OriginalRequest>,
    accessToken: string,
  ): void {
    originalRequest.retry = true;
    originalRequest.headers.Authorization = this.createBearerToken(accessToken);
  }

  private handlePromiseQueue(param: { accessToken: string } | { error: unknown }): void {
    if (this.promiseQueue.isEmpty) return;

    const hasAccessToken = 'accessToken' in param;
    this.promiseQueue.forEach(promise => {
      hasAccessToken ? promise.resolve(param.accessToken) : promise.reject(param.error);
    });

    this.promiseQueue.length = 0;
  }

  responseDataAdapter<
    Z extends ZodTypeAny,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends (...args: any[]) => Promise<AxiosResponse>,
  >(schema: Z, request: T): (...args: Parameters<T>) => Promise<z.infer<Z>> {
    return async (...args) => {
      const response = await request(...args);
      const result = schema.safeParse(response.data);

      if (result.success) return result.data;

      const title = `${response.config.method} ${response.config.url}`;
      const message = JSON.stringify(result.error.format());
      if (Config.ENV === 'development' && !__DEV__) Alert.alert(title, message);
      throw new ZodError(result.error.issues);
    };
  }
}
