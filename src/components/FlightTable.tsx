import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
  setStatus,
  setDestination,
  setFlightNumber,
  clearFilters,
  openForm,
  closeForm,
} from '../store/flightFiltersSlice';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { searchFlights, deleteFlight, addFlight } from '../api/flightApi';
import { Box , TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { FlightForm } from './FlightForm';
import { Flight, FlightInput } from '../types/flight';
import { useFlightsSignalR } from '../signalr/useFlightsSignalR';
import axios from 'axios';

export function FlightTable() {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.flightFilters);

  const queryClient = useQueryClient();

  const { data: flights = [], isLoading, refetch } = useQuery<Flight[]>({
    queryKey: ['flights', { status: filters.status, destination: filters.destination, flightNumber: filters.flightNumber }],
    queryFn: () => searchFlights(filters),
  });

  useFlightsSignalR(filters);

  const addFlightMutation = useMutation<Flight, Error, FlightInput>({
    mutationFn: (newFlight) => addFlight(newFlight),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
      dispatch(closeForm());
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert("Error: " + error.response.data);
        } else {
          alert("Network error: " + error.message);
        }
      } else {
        alert("Unexpected error");
      }
    },
  });

  const deleteFlightMutation = useMutation<void, Error, string>({
    mutationFn: (flightId) => deleteFlight(flightId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert("Error: " + error.response.data);
        } else {
          alert("Network error: " + error.message);
        }
      } else {
        alert("Unexpected error");
      }
    },
  });

  const handleAddFlight = (flightData: FlightInput) => {
    addFlightMutation.mutate(flightData);
  };

  const handleDeleteFlight = (flightId: string) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      deleteFlightMutation.mutate(flightId);
    }
  };

  const handleChange = (field: keyof typeof filters) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (field === 'status') dispatch(setStatus(value));
    else if (field === 'destination') dispatch(setDestination(value));
    else if (field === 'flightNumber') dispatch(setFlightNumber(value));
  };

  const handleSearch = () => {
    refetch();
  };

  const handleClear = () => {
    dispatch(clearFilters());
  };

  if (isLoading) return <div>Loading flights...</div>;

  return (
    <div>
      <Button variant="contained" onClick={() => dispatch(openForm())}>
        Add Flight
      </Button>

      <FlightForm open={filters.isFormOpen} onClose={() => dispatch(closeForm())} onSubmit={handleAddFlight} />

      <Box
        sx={{
          backgroundColor: '#f0f0f0',
          padding: 2,
          marginTop: 3,
          marginBottom: 3,
          borderRadius: 2,
          maxWidth: 700,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <TextField label="Status" value={filters.status} onChange={handleChange('status')} fullWidth />
          <TextField label="Destination" value={filters.destination} onChange={handleChange('destination')} fullWidth />
          <TextField label="Flight Number" value={filters.flightNumber} onChange={handleChange('flightNumber')} fullWidth />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>
            Clear Filters
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ maxWidth: 900, margin: 'auto', marginTop: 3 }}>
  <Table>
    <TableHead>
      <TableRow sx={{ backgroundColor: '#1976d2' }}>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Flight Number</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Destination</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Gate</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Departure Time</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {flights.length > 0 ? (
        flights.map((f, index) => (
          <TableRow
            key={f.id}
            sx={{
              backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
              '&:hover': { backgroundColor: '#e3f2fd' },
            }}
          >
            <TableCell>{f.flightNumber}</TableCell>
            <TableCell>{f.destination}</TableCell>
            <TableCell>{f.gate}</TableCell>
            <TableCell>{new Date(f.departureTime).toLocaleString()}</TableCell>
            <TableCell>{f.status}</TableCell>
            <TableCell>
              <Button variant="contained" color="error" onClick={() => handleDeleteFlight(f.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} align="center" sx={{ padding: 3 }}>
            No flights found matching the criteria
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>
    </div>
  );
}
