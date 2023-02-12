import { useCommonStore } from '@stores';
import { _formatDateTime, _formatNumber } from '@utilities';
import isEqual from 'react-fast-compare';

const useFormat = () => {
  useCommonStore(state => state.language, isEqual);

  return { formatDateTime: _formatDateTime, formatNumber: _formatNumber };
};

export default useFormat;
