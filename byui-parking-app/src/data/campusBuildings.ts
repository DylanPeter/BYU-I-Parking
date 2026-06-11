export type CampusBuilding = {
  id: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
};

export const campusBuildings: CampusBuilding[] = [
  {
    id: 1,
    name: "Manwaring Center",
    description: "Student center, dining, and campus services.",
    lat: 43.8159,
    lng: -111.7831,
  },
  {
    id: 2,
    name: "David O. McKay Library",
    description: "Main campus library.",
    lat: 43.8183,
    lng: -111.7832,
  },
  {
    id: 3,
    name: "Hart Building",
    description: "Gym, recreation, and athletics.",
    lat: 43.8202,
    lng: -111.7842,
  },
  {
    id: 4,
    name: "Benson Building",
    description: "Science and classroom building.",
    lat: 43.8173,
    lng: -111.7823,
  },
  {
    id: 5,
    name: "BYU-Idaho Center",
    description: "Large event and devotional center.",
    lat: 43.8192,
    lng: -111.7821,
  },
];