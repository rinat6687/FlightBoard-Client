import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightsFilterState {
  status: string;
  destination: string;
}

const initialState: FlightsFilterState = {
  status: '',
  destination: '',
};

const flightsFilterSlice = createSlice({
  name: 'flightsFilter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const { setStatus, setDestination, clearFilters } = flightsFilterSlice.actions;
export default flightsFilterSlice.reducer;
