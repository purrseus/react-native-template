import { createPersistenceStore } from '@/utils/store';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthActions = {
  setTokens: (tokens: Partial<AuthState>) => void;
  clearTokens: () => void;
};

const useAuthStore = createPersistenceStore<AuthState & AuthActions>('auth', set => ({
  accessToken: null,
  refreshToken: null,
  setTokens: ({ accessToken, refreshToken }) =>
    set(state => {
      if (accessToken) state.accessToken = accessToken;
      if (refreshToken) state.refreshToken = refreshToken;
    }),
  clearTokens: () =>
    set(state => {
      state.accessToken = null;
      state.refreshToken = null;
    }),
}));

export default useAuthStore;