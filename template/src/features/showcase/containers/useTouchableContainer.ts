import { useCommonStore } from '@/stores';

const useTouchableContainer = () => {
  const [theme, changeTheme] = useCommonStore(state => [state.theme, state.changeTheme]);

  const onSwitchPress = () => {
    changeTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const onButtonPress = () => {
    changeTheme('auto');
  };

  return {
    isSwitchEnabled: theme === 'dark',
    onSwitchPress,
    onButtonPress,
  };
};

export default useTouchableContainer;
