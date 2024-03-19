import { configureStore } from '@reduxjs/toolkit';
import multiSelectReducer from './multiSelect/multiSelectSlice';

export const store = configureStore({
  reducer: {
    multiSelect: multiSelectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
