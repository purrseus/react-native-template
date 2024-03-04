import { PublicScreenName } from '@/core/enums';
import { PublicScreenProps } from '@/core/types';
import { useAuthStore } from '@/stores';

const useLoginContainer = ({ navigation }: PublicScreenProps<PublicScreenName.Login>) => {
  const setTokens = useAuthStore(state => state.setTokens);

  const handleLogin = () => {
    setTokens({
      accessToken: 'fakeAccessToken',
      refreshToken: 'fakeRefreshToken',
    });
  };

  const navigateToRegister = () => navigation.navigate(PublicScreenName.Register);

  return { handleLogin, navigateToRegister };
};

export default useLoginContainer;
