import { useAuthStore } from '@/stores';

const useProfileContainer = () => {
  const clearTokens = useAuthStore(state => state.clearTokens);

  const logout = () => clearTokens();

  return { logout };
};

export default useProfileContainer;
