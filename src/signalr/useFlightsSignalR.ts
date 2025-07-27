import { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { useQueryClient } from '@tanstack/react-query';
import { Flight } from '../types/flight';

export function useFlightsSignalR(filters: { status: string; destination: string; flightNumber: string }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7104/api/flights')
      .withAutomaticReconnect()
      .build();

    connection.start().catch(console.error);

    connection.on('FlightAdded', (newFlight: Flight) => {
      queryClient.setQueryData<Flight[]>(['flights', filters], old =>
        old ? [...old, newFlight] : [newFlight]
      );
    });

    connection.on('FlightDeleted', (flightId: string) => {
      queryClient.setQueryData<Flight[]>(['flights', filters], old =>
        old ? old.filter(f => f.id !== flightId) : []
      );
    });

    return () => {
      connection.stop();
    };
  }, [filters, queryClient]);
}
