import { RefreshTokenResponse } from '@core/interfaces';
import { CommonStatus } from '@core/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPersistReducer } from '@utilities';
import axios, { AxiosResponse } from 'axios';

interface AuthState {
  status: CommonStatus;
  accessToken?: string;
  refreshToken?: string;
}

const SLICE_NAME = 'auth';

const initialState: AuthState = {
  status: 'idle',
};

const handleRefreshToken = (refreshToken: string): Promise<AxiosResponse<RefreshTokenResponse>> =>
  axios.post(`/auth/refresh-token`, {
    refreshToken,
  });

const resetState = (): AuthState => initialState;

export const fetchNewAccessToken = createAsyncThunk(
  `${SLICE_NAME}/fetchNewAccessToken`,
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as AuthState;
      if (!state.refreshToken) throw new Error();
      const {
        data: { accessToken },
      } = await handleRefreshToken(state.refreshToken);
      if (typeof accessToken !== 'string') throw new Error();
      return accessToken;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<Omit<AuthState, 'status'>>) => {
      if (payload.accessToken) state.accessToken = payload.accessToken;
      if (payload.refreshToken) state.refreshToken = payload.refreshToken;
    },
    logOut: resetState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNewAccessToken.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchNewAccessToken.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.accessToken = payload;
      })
      .addCase(fetchNewAccessToken.rejected, resetState);
  },
});

export const authActions = authSlice.actions;
export default createPersistReducer(authSlice, { blacklist: ['status'] });
