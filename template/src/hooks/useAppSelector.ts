import { RootState } from '@core/types';
import isEqual from 'react-fast-compare';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const useAppSelector: TypedUseSelectorHook<RootState> = selector => useSelector(selector, isEqual);

export default useAppSelector;
