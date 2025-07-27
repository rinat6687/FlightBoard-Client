export interface Flight {
  id: string;
  flightNumber: string;
  destination: string;
  departureTime: string;
  gate: string;
  status: string;
}

export type FlightInput = Omit<Flight, 'id' | 'status'>;

