import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { campusLots, parkingSpots } from '../data/parkingData';
import type { ParkingLot, ParkingSpot } from '../data/parkingData';

export interface Reservation {
  id: string;
  lotId: string;
  spotLabel?: string;
  startTime: string; // ISO time or HH:MM
  durationHours: number;
  cost: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface Transaction {
  id: string;
  reservationId?: string;
  date: string; // ISO
  amount: number;
  description?: string;
}

type State = {
  lots: ParkingLot[];
  spots: ParkingSpot[];
  reservations: Reservation[];
  transactions: Transaction[];
};

const initialState: State = {
  lots: computeAvailability(campusLots, parkingSpots),
  spots: parkingSpots.map((spot) => ({ ...spot })),
  reservations: [],
  transactions: [],
};

const STORAGE_KEY = 'byui-parking-state';

const loadState = (): State => {
  if (typeof window === 'undefined') return initialState;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialState;
    const parsed = JSON.parse(stored) as State;
    if (!parsed.lots || !Array.isArray(parsed.lots) || !parsed.spots || !Array.isArray(parsed.spots)) {
      return initialState;
    }
    return parsed;
  } catch {
    return initialState;
  }
};

type Action =
  | { type: 'RESERVE_SPOT'; payload: { lotId: string; spotId: string; durationHours: number; startTime: string; spotLabel?: string; cost: number } }
  | { type: 'COMPLETE_RESERVATION'; payload: { reservationId: string } }
  | { type: 'CANCEL_RESERVATION'; payload: { reservationId: string } };

function computeAvailability(lots: ParkingLot[], spots: ParkingSpot[]): ParkingLot[] {
  return lots.map((lot) => {
    const lotSpots = spots.filter((spot) => spot.lotId === lot.id);
    const availableCount = lotSpots.filter((spot) => spot.status === 'Available').length;
    const status = availableCount === 0 ? 'Full' : availableCount < 5 ? 'Limited' : 'Open';
    return {
      ...lot,
      availableSpots: availableCount,
      status,
    };
  });
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESERVE_SPOT': {
      const { lotId, spotId, durationHours, startTime, spotLabel, cost } = action.payload;
      const reservationId = `RES-${Date.now()}`;

      const newReservation: Reservation = {
        id: reservationId,
        lotId,
        spotLabel,
        startTime,
        durationHours,
        cost,
        status: 'Confirmed',
      };

      const transaction: Transaction = {
        id: `TX-${Date.now()}`,
        reservationId,
        date: new Date().toISOString(),
        amount: cost,
        description: `Reservation ${reservationId} for ${lotId}`,
      };

      const updatedSpots: ParkingSpot[] = state.spots.map((spot) =>
        spot.id === spotId ? { ...spot, status: 'Reserved' } : spot
      );

      return {
        ...state,
        spots: updatedSpots,
        lots: computeAvailability(state.lots, updatedSpots),
        reservations: [newReservation, ...state.reservations],
        transactions: [transaction, ...state.transactions],
      };
    }

    case 'COMPLETE_RESERVATION': {
      return {
        ...state,
        reservations: state.reservations.map((r) => (r.id === action.payload.reservationId ? { ...r, status: 'Completed' } : r)),
      };
    }

    case 'CANCEL_RESERVATION': {
      const res = state.reservations.find((r) => r.id === action.payload.reservationId);
      if (!res) return state;
      const updatedSpots: ParkingSpot[] = state.spots.map((spot) =>
        spot.label === res.spotLabel && spot.lotId === res.lotId
          ? { ...spot, status: 'Available' }
          : spot
      );

      return {
        ...state,
        spots: updatedSpots,
        lots: computeAvailability(state.lots, updatedSpots),
        reservations: state.reservations.map((r) => (r.id === action.payload.reservationId ? { ...r, status: 'Cancelled' } : r)),
      };
    }

    default:
      return state;
  }
}

const ParkingContext = createContext<{
  state: State;
  reserveSpot: (lotId: string, spotId: string, startTime: string, durationHours: number, spotLabel?: string) => void;
  cancelReservation: (reservationId: string) => void;
} | null>(null);

export const ParkingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => loadState());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const reserveSpot = (lotId: string, spotId: string, startTime: string, durationHours: number, spotLabel?: string) => {
    const ratePerHour = 1.5; // MVP flat rate
    const cost = Math.max(0, durationHours) * ratePerHour;
    dispatch({ type: 'RESERVE_SPOT', payload: { lotId, spotId, startTime, durationHours, spotLabel, cost } });
  };

  const cancelReservation = (reservationId: string) => {
    dispatch({ type: 'CANCEL_RESERVATION', payload: { reservationId } });
  };

  return <ParkingContext.Provider value={{ state, reserveSpot, cancelReservation }}>{children}</ParkingContext.Provider>;
};

export function useParking() {
  const ctx = useContext(ParkingContext);
  if (!ctx) throw new Error('useParking must be used within ParkingProvider');
  return ctx;
}

export default ParkingProvider;
