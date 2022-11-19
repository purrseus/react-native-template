import { AppDispatch } from '@core/types';
import { useDispatch } from 'react-redux';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
