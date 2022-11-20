import { darkTheme, lightTheme } from '@themes';
import { useColorScheme } from 'react-native';
import useAppSelector from './useAppSelector';

const useColor = () => {
  const colorScheme = useColorScheme();
  const { theme } = useAppSelector(state => state.common);
  return (theme === 'auto' ? colorScheme : theme) === 'dark' ? darkTheme : lightTheme;
};

export default useColor;
