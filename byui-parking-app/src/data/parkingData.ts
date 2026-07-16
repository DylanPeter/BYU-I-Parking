export type ParkingLot = {
  id: string;
  name: string;
  availableSpots: number;
  totalSpots: number;
  status: "Open" | "Limited" | "Full";
  coordinates: [number, number];
  walkMinutes: Record<string, number>;
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
    id: "manwaring",
    name: "Manwaring Lot",
    availableSpots: 18,
    totalSpots: 120,
    status: "Open",
    coordinates: [43.8181, -111.7839],
    walkMinutes: { manwaring: 2, library: 4, hart: 6, smith: 5 },
  },
  {
    id: "library",
    name: "Library Lot",
    availableSpots: 4,
    totalSpots: 90,
    status: "Limited",
    coordinates: [43.8185, -111.7838],
    walkMinutes: { manwaring: 2, library: 1, hart: 6, smith: 3 },
  },
  {
    id: "hart",
    name: "Hart Lot",
    availableSpots: 42,
    totalSpots: 160,
    status: "Open",
    coordinates: [43.8176, -111.7803],
    walkMinutes: { manwaring: 5, library: 6, hart: 1, smith: 6 },
  },
  {
    id: "stadium",
    name: "Stadium Lot",
    availableSpots: 67,
    totalSpots: 200,
    status: "Open",
    coordinates: [43.8202, -111.7880],
    walkMinutes: { manwaring: 8, library: 7, hart: 4, smith: 9 },
  },

  {
  id: "snow",
  name: "Snow Lot",
  availableSpots: 12,
  totalSpots: 85,
  status: "Limited",
  coordinates: [43.8204, -111.7847],
  walkMinutes: { manwaring: 4, library: 2, hart: 6, smith: 2 },
},
{
  id: "taylor",
  name: "Taylor Lot",
  availableSpots: 36,
  totalSpots: 110,
  status: "Open",
  coordinates: [43.8153, -111.7828],
  walkMinutes: { manwaring: 2, library: 5, hart: 7, smith: 6 },
},
{
  id: "benson",
  name: "Benson Lot",
  availableSpots: 14,
  totalSpots: 95,
  status: "Limited",
  coordinates: [43.8142, -111.7818],
  walkMinutes: { manwaring: 6, library: 5, hart: 2, smith: 4 },
},
{
  id: "kimball",
  name: "Kimball Lot",
  availableSpots: 51,
  totalSpots: 140,
  status: "Open",
  coordinates: [43.8149, -111.7804],
  walkMinutes: { manwaring: 3, library: 5, hart: 6, smith: 4 },
},
{
  id: "hinckley",
  name: "Hinckley Lot",
  availableSpots: 28,
  totalSpots: 90,
  status: "Open",
  coordinates: [43.8135, -111.7788],
  walkMinutes: { manwaring: 4, library: 6, hart: 8, smith: 5 },
},
{
  id: "health-center",
  name: "Health Center Lot",
  availableSpots: 8,
  totalSpots: 60,
  status: "Limited",
  coordinates: [43.8150, -111.7870],
  walkMinutes: { manwaring: 7, library: 6, hart: 3, smith: 5 },
},
{
  id: "byui-center",
  name: "BYU-Idaho Center Lot",
  availableSpots: 44,
  totalSpots: 180,
  status: "Open",
  coordinates: [43.8162, -111.7850],
  walkMinutes: { manwaring: 3, library: 6, hart: 8, smith: 5 },
},
{
  id: "clarke",
  name: "Clarke Lot",
  availableSpots: 6,
  totalSpots: 70,
  status: "Limited",
  coordinates: [43.8193, -111.7805],
  walkMinutes: { manwaring: 5, library: 5, hart: 2, smith: 5 },
},
{
  id: "visual-arts",
  name: "Visual Arts Studio Lot",
  availableSpots: 22,
  totalSpots: 75,
  status: "Open",
  coordinates: [43.8204, -111.7806],
  walkMinutes: { manwaring: 6, library: 3, hart: 7, smith: 2 },
},
{
  id: "centre-square",
  name: "Centre Square Lot",
  availableSpots: 17,
  totalSpots: 65,
  status: "Open",
  coordinates: [43.8115, -111.7881],
  walkMinutes: { manwaring: 5, library: 7, hart: 8, smith: 6 },
},
{
  id: "ricks",
  name: "Ricks Lot",
  availableSpots: 11,
  totalSpots: 90,
  status: "Limited",
  coordinates: [43.8127, -111.7808],
  walkMinutes: { manwaring: 5, library: 6, hart: 8, smith: 6 },
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