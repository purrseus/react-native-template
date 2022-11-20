import { UnprotectedScreenName } from '@core/enums';
import { UnprotectedScreenProps } from '@core/types';

const useRegisterContainer = ({
  navigation: { goBack },
}: UnprotectedScreenProps<UnprotectedScreenName.Register>) => {
  return { goBack };
};

export default useRegisterContainer;
