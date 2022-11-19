import { Spacer } from '@components/core';
import { ProtectedScreenName } from '@core/enums';
import { ProtectedScreenProps } from '@core/types';
import { ListRenderItem } from 'react-native';
import { ShowcaseItem } from '../components';

const useShowcaseListContainer = ({
  navigation: { navigate },
}: ProtectedScreenProps<ProtectedScreenName.ShowcaseList>) => {
  const data = [
    ProtectedScreenName.BottomSheets,
    ProtectedScreenName.Pressable,
    ProtectedScreenName.Form,
    ProtectedScreenName.Images,
    ProtectedScreenName.Layouts,
    ProtectedScreenName.List,
    ProtectedScreenName.Loader,
    ProtectedScreenName.Modals,
    ProtectedScreenName.Pickers,
    ProtectedScreenName.Spacers,
    ProtectedScreenName.Texts,
  ];

  const renderItem: ListRenderItem<ProtectedScreenName> = ({ item }) => (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <ShowcaseItem title={item} onPress={() => navigate(item as any)} />
  );

  const ItemSeparatorComponent = () => <Spacer h={16} />;

  return { data, renderItem, ItemSeparatorComponent };
};

export default useShowcaseListContainer;
