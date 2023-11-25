import { PublicScreenName } from '@/core/enums';
import { PublicScreenProps } from '@/core/types';

const useRegisterContainer = ({
  navigation: { goBack },
}: PublicScreenProps<PublicScreenName.Register>) => {
  return { goBack };
};

export default useRegisterContainer;
