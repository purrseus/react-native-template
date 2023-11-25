import { useAuthStore } from '@/stores';
import isEqual from 'react-fast-compare';

const useProfileContainer = () => {
  const clearTokens = useAuthStore(state => state.clearTokens, isEqual);

  const logout = () => clearTokens();

  return { logout };
};

export default useProfileContainer;
