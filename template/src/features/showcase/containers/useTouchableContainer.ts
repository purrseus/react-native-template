import { useCommonStore } from '@/stores';
import { useShallow } from 'zustand/react/shallow';

const useTouchableContainer = () => {
  const [theme, changeTheme, changeLanguage] = useCommonStore(
    useShallow(state => [state.theme, state.changeTheme, state.changeLanguage]),
  );

  const onSwitchPress = () => {
    changeTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const onLargeButtonPress = () => {
    changeTheme('auto');
  };

  const onMediumButtonPress = () => {
    changeLanguage('en-US');
  };

  const onSmallButtonPress = () => {
    changeLanguage('vi-VN');
  };

  return {
    isSwitchEnabled: theme === 'dark',
    onSwitchPress,
    onLargeButtonPress,
    onMediumButtonPress,
    onSmallButtonPress,
  };
};

export default useTouchableContainer;
