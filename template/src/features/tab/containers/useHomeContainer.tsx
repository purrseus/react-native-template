import { ProtectedScreenName, TabScreenName } from '@core/enums';
import { TabScreenProps } from '@core/types';

const useHomeContainer = ({ navigation }: TabScreenProps<TabScreenName.Home>) => {
  const goToShowcase = () => navigation.navigate(ProtectedScreenName.ShowcaseList);

  return { goToShowcase };
};

export default useHomeContainer;
