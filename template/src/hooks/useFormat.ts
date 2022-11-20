import { _formatDateTime, _formatNumber } from '@utilities';
import useAppSelector from './useAppSelector';

const useFormat = () => {
  useAppSelector(state => state.common.language);

  return { dateTimeFormatter: _formatDateTime, numberFormatter: _formatNumber };
};

export default useFormat;
