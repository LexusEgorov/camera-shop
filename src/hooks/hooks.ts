import { useSelector } from 'react-redux';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { AppDispatch, State } from '../types/types';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector : TypedUseSelectorHook<State> = useSelector;
