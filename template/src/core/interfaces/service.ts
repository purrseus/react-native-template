export interface File {
  uri: string;
  name: string;
  type: string;
}

export interface PaginationResponse<T> {
  data?: T;
  // ...
}

export interface RefreshTokenResponse {
  accessToken?: string;
}
