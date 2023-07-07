import { createPersistenceStore } from '@utilities/store';

interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthState extends Tokens {
  setTokens: (tokens: Partial<Tokens>) => void;
  clearTokens: () => void;
}

const useAuthStore = createPersistenceStore<AuthState>('auth', set => ({
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
