import { configureStore } from '@reduxjs/toolkit';
import cards from './slice/cardSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    cards,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
