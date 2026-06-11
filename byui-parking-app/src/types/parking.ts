export type ParkingLot = {
  id: number;
  name: string;
  location: string;
  totalSpots: number;
  availableSpots: number;
  permitTypes: string[];
  distance: string;
  lat: number;
  lng: number;
};

export type Reservation = {
  lot: string;
  startTime: string;
  duration: string;
  code: string;
};