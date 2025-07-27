import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  status: string;
  destination: string;
  flightNumber: string;
  isFormOpen: boolean;
}

const initialState: FiltersState = {
  status: '',
  destination: '',
  flightNumber: '',
  isFormOpen: false,
};

const flightFiltersSlice = createSlice({
  name: 'flightFilters',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setDestination(state, action: PayloadAction<string>) {
      state.destination = action.payload;
    },
    setFlightNumber(state, action: PayloadAction<string>) {
      state.flightNumber = action.payload;
    },
    clearFilters(state) {
      state.status = '';
      state.destination = '';
      state.flightNumber = '';
    },
    openForm(state) {
      state.isFormOpen = true;
    },
    closeForm(state) {
      state.isFormOpen = false;
    },
  },
});

export const {
  setStatus,
  setDestination,
  setFlightNumber,
  clearFilters,
  openForm,
  closeForm,
} = flightFiltersSlice.actions;

export default flightFiltersSlice.reducer;
