import { useCommonStore } from '@/stores';
import { _formatDateTime, _formatNumber } from '@/utils';

const useFormat = () => {
  useCommonStore(state => state.language);

  return { formatDateTime: _formatDateTime, formatNumber: _formatNumber };
};

export default useFormat;
