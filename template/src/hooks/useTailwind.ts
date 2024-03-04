import { useCommonStore } from '@/stores';
import { TailwindService } from '@/utils';
import { useDeviceContext } from 'twrnc';

export default function useTailwind() {
  const theme = useCommonStore(state => state.theme);
  useDeviceContext(TailwindService.tailwind, { withDeviceColorScheme: theme === 'auto' });
  return TailwindService.tailwind;
}
