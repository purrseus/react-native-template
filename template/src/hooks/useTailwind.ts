import { default as tailwind } from '@/libs/tailwind';
import { useCommonStore } from '@/stores';
import { useDeviceContext } from 'twrnc';

export default function useTailwind() {
  const theme = useCommonStore(state => state.theme);
  useDeviceContext(tailwind, { withDeviceColorScheme: theme === 'auto' });
  return tailwind;
}
