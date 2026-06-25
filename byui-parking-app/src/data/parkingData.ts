export interface ParkingLot {
  id: string;
  name: string;
  availableSpots: number;
  totalSpots: number;
  status: 'Open' | 'Limited' | 'Full';
  location: string;
  lat: number;
  lng: number;
}

export interface ParkingSpot {
  id: string;
  lotId: string;
  label: string;
  status: 'Available' | 'Occupied' | 'Reserved';
  accessible?: boolean;
  evCharging?: boolean;
  compact?: boolean;
}

export const campusLots: ParkingLot[] = [
  { id: 'lot-a', name: 'Manwaring Center Lot (Lot A)', availableSpots: 18, totalSpots: 120, status: 'Open', location: 'Central campus, by the Manwaring Center', lat: 43.8161, lng: -111.7825 },
  { id: 'lot-b', name: 'Library Lot (Lot B)', availableSpots: 4, totalSpots: 90, status: 'Limited', location: 'North of the McKay Library', lat: 43.8188, lng: -111.7838 },
  { id: 'lot-c', name: 'Hart Lot (Lot C)', availableSpots: 42, totalSpots: 160, status: 'Open', location: 'West of the Hart Building', lat: 43.8204, lng: -111.7851 },
  { id: 'lot-d', name: 'Stadium Lot (Lot D)', availableSpots: 67, totalSpots: 200, status: 'Open', location: 'South campus, by the stadium', lat: 43.8142, lng: -111.7818 },
];

export const parkingSpots: ParkingSpot[] = [
  { id: 'spot-a1', lotId: 'lot-a', label: 'A-1', status: 'Available', accessible: true },
  { id: 'spot-a2', lotId: 'lot-a', label: 'A-2', status: 'Available' },
  { id: 'spot-a3', lotId: 'lot-a', label: 'A-3', status: 'Occupied' },
  { id: 'spot-a4', lotId: 'lot-a', label: 'A-4', status: 'Available', evCharging: true },
  { id: 'spot-a5', lotId: 'lot-a', label: 'A-5', status: 'Available' },
  { id: 'spot-a6', lotId: 'lot-a', label: 'A-6', status: 'Available', compact: true },
  { id: 'spot-b1', lotId: 'lot-b', label: 'B-1', status: 'Available', accessible: true },
  { id: 'spot-b2', lotId: 'lot-b', label: 'B-2', status: 'Reserved' },
  { id: 'spot-b3', lotId: 'lot-b', label: 'B-3', status: 'Occupied' },
  { id: 'spot-b4', lotId: 'lot-b', label: 'B-4', status: 'Available' },
  { id: 'spot-c1', lotId: 'lot-c', label: 'C-1', status: 'Available' },
  { id: 'spot-c2', lotId: 'lot-c', label: 'C-2', status: 'Occupied' },
  { id: 'spot-c3', lotId: 'lot-c', label: 'C-3', status: 'Available', evCharging: true },
  { id: 'spot-d1', lotId: 'lot-d', label: 'D-1', status: 'Available' },
  { id: 'spot-d2', lotId: 'lot-d', label: 'D-2', status: 'Available' },
  { id: 'spot-d3', lotId: 'lot-d', label: 'D-3', status: 'Reserved' },
];
