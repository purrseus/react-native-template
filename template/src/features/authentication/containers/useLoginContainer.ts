import { PublicScreenName } from '@core/enums';
import { PublicScreenProps } from '@core/types';
import { useAuthStore } from '@stores';
import isEqual from 'react-fast-compare';

const useLoginContainer = ({ navigation }: PublicScreenProps<PublicScreenName.Login>) => {
  const setTokens = useAuthStore(state => state.setTokens, isEqual);

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
