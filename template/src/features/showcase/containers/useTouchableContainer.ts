import tailwind from '@/libs/tailwind';
import { useCommonStore } from '@/stores';
import { useAppColorScheme } from 'twrnc';

const useTouchableContainer = () => {
  const [theme, changeTheme] = useCommonStore(state => [state.theme, state.changeTheme]);
  const [, , setColorScheme] = useAppColorScheme(tailwind);

  const onSwitchPress = () => {
    changeTheme(theme === 'dark' ? 'light' : 'dark');
    setColorScheme(theme === 'dark' ? 'light' : 'dark');
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
