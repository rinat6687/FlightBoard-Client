import axios from 'axios';
import { Flight, FlightInput } from '../types/flight';

const API_URL = 'https://localhost:7104/api/flights';


export const searchFlights = async (filters: {
  status?: string;
  destination?: string;
  flightNumber?: string;
}) => {
  const params = new URLSearchParams();

  if (filters.status) params.append('status', filters.status);
  if (filters.destination) params.append('destination', filters.destination);
  if (filters.flightNumber) params.append('flightNumber', filters.flightNumber);

  const response = await axios.get(`${API_URL}/search?${params.toString()}`);
  return response.data;
};

export const addFlight = async (newFlight: FlightInput): Promise<Flight> => {
  const response = await axios.post(`${API_URL}/add`, newFlight);
  return response.data;
};

export const deleteFlight = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/delete/${id}`);
};
