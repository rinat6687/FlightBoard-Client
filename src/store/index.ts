import { configureStore } from '@reduxjs/toolkit';
import flightFiltersReducer from './flightFiltersSlice';

export const store = configureStore({
  reducer: {
    flightFilters: flightFiltersReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
