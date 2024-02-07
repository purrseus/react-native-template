import { useCommonStore } from '@/stores';
import { tailwind } from '@/utils';
import { useDeviceContext } from 'twrnc';

export default function useTailwind() {
  const theme = useCommonStore(state => state.theme);
  useDeviceContext(tailwind, { withDeviceColorScheme: theme === 'auto' });
  return tailwind;
}
