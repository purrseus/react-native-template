import { useAppDispatch } from '@hooks';
import { authActions } from '@store/slices/auth';

const useProfileContainer = () => {
  const dispatch = useAppDispatch();

  const logout = () => dispatch(authActions.logOut());

  return { logout };
};

export default useProfileContainer;
