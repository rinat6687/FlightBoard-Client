import { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { FlightInput } from '../types/flight';

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (flight: FlightInput) => void;
};

export function FlightForm({ open, onClose, onSubmit }: Props) {
  const [flight, setFlight] = useState<FlightInput>({ flightNumber: '', destination: '', gate: '', departureTime: '' });
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const { flightNumber, destination, gate, departureTime } = flight;

    if (!flightNumber || !destination || !gate || !departureTime) {
      setError('Please fill out all fields');
      return;
    }

    setError('');
    onSubmit(flight);
    setFlight({ flightNumber: '', destination: '', gate: '', departureTime: '' });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Flight</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField label="Flight Number" value={flight.flightNumber} onChange={e => setFlight({ ...flight, flightNumber: e.target.value })} />
        <TextField label="Destination" value={flight.destination} onChange={e => setFlight({ ...flight, destination: e.target.value })} />
        <TextField label="Gate" value={flight.gate} onChange={e => setFlight({ ...flight, gate: e.target.value })} />
        <TextField
          label="Departure Time"
          type="datetime-local"
          value={flight.departureTime}
          onChange={e => setFlight({ ...flight, departureTime: e.target.value })}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
