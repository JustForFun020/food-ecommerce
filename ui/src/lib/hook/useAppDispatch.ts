import { useDispatch } from 'react-redux';
import { AppDispatch } from './../../utils/types/redux.d';
export const useAppDispatch: () => AppDispatch = useDispatch;
