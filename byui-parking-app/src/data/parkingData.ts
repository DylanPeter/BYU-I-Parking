export type ParkingLot = {
  id: string;
  name: string;
  availableSpots: number;
  totalSpots: number;
  status: "Open" | "Limited" | "Full";
  coordinates: [number, number];
  walkMinutes: Record<string, number>;
  boundary?: [number, number][];
};

export interface ParkingSpot {
  id: string;
  lotId: string;
  label: string;
  status: "Available" | "Occupied" | "Reserved";
  accessible?: boolean;
  evCharging?: boolean;
  compact?: boolean;
}

export const campusLots: ParkingLot[] = [
  {
    id: "lot-a",
    name: "Manwaring Lot",
    availableSpots: 18,
    totalSpots: 120,
    status: "Open",
    coordinates: [43.8181, -111.7839],
    walkMinutes: {
      manwaring: 2,
      library: 4,
      hart: 6,
      smith: 5,
    },
    boundary: [
      [43.81825, -111.78415],
      [43.81855, -111.78395],
      [43.81835, -111.78355],
      [43.81805, -111.78375],
    ],
  },
  {
    id: "lot-b",
    name: "Library Lot (Lot B)",
    availableSpots: 4,
    totalSpots: 90,
    status: "Limited",
    coordinates: [43.8185, -111.7838],
    walkMinutes: {
      manwaring: 2,
      library: 4,
      hart: 7,
      smith: 4,
    },
    boundary: [
      [43.8187, -111.7841],
      [43.8189, -111.7836],
      [43.81845, -111.78335],
      [43.81825, -111.78385],
    ],
  },
  {
    id: "lot-c",
    name: "Hart Lot (Lot C)",
    availableSpots: 42,
    totalSpots: 160,
    status: "Open",
    coordinates: [43.8176, -111.7803],
    walkMinutes: {
      manwaring: 5,
      library: 6,
      hart: 1,
      smith: 6,
    },
    boundary: [
      [43.81725, -111.78255],
      [43.81725, -111.78115],
      [43.81625, -111.78115],
      [43.81625, -111.78255],
    ],
  },
  {
    id: "lot-d",
    name: "Stadium Lot (Lot D)",
    availableSpots: 67,
    totalSpots: 200,
    status: "Open",
    coordinates: [43.8128, -111.7829],
    walkMinutes: {
      manwaring: 8,
      library: 7,
      hart: 4,
      smith: 9,
    },
    boundary: [
      [43.81325, -111.7836],
      [43.81325, -111.7822],
      [43.81235, -111.7822],
      [43.81235, -111.7836],
    ],
  },
];

export const parkingSpots: ParkingSpot[] = [
  { id: "spot-a1", lotId: "lot-a", label: "A-1", status: "Available", accessible: true },
  { id: "spot-a2", lotId: "lot-a", label: "A-2", status: "Available" },
  { id: "spot-a3", lotId: "lot-a", label: "A-3", status: "Occupied" },
  { id: "spot-a4", lotId: "lot-a", label: "A-4", status: "Available", evCharging: true },
  { id: "spot-a5", lotId: "lot-a", label: "A-5", status: "Available" },
  { id: "spot-a6", lotId: "lot-a", label: "A-6", status: "Available", compact: true },

  { id: "spot-b1", lotId: "lot-b", label: "B-1", status: "Available", accessible: true },
  { id: "spot-b2", lotId: "lot-b", label: "B-2", status: "Reserved" },
  { id: "spot-b3", lotId: "lot-b", label: "B-3", status: "Occupied" },
  { id: "spot-b4", lotId: "lot-b", label: "B-4", status: "Available" },

  { id: "spot-c1", lotId: "lot-c", label: "C-1", status: "Available" },
  { id: "spot-c2", lotId: "lot-c", label: "C-2", status: "Occupied" },
  { id: "spot-c3", lotId: "lot-c", label: "C-3", status: "Available", evCharging: true },

  { id: "spot-d1", lotId: "lot-d", label: "D-1", status: "Available" },
  { id: "spot-d2", lotId: "lot-d", label: "D-2", status: "Available" },
  { id: "spot-d3", lotId: "lot-d", label: "D-3", status: "Reserved" },
];