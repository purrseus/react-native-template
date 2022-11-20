import { UnprotectedScreenName } from '@core/enums';
import { UnprotectedScreenProps } from '@core/types';
import { useAppDispatch } from '@hooks';
import { authActions } from '@store/slices/auth';

const useLoginContainer = ({ navigation }: UnprotectedScreenProps<UnprotectedScreenName.Login>) => {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(
      authActions.setToken({
        accessToken: 'fakeAccessToken',
        refreshToken: 'fakeRefreshToken',
      }),
    );
  };

  const navigateToRegister = () => navigation.navigate(UnprotectedScreenName.Register);

  return { handleLogin, navigateToRegister };
};

export default useLoginContainer;
