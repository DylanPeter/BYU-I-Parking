export type Destination = {
  id: string;
  name: string;
  coordinates: [number, number];
};

export const destinations: Destination[] = [
  {
    id: "manwaring",
    name: "Manwaring Center",
    coordinates: [43.8184, -111.7831],
  },
  {
    id: "library",
    name: "McKay Library",
    coordinates: [43.8191, -111.7824],
  },
  {
    id: "hart",
    name: "Hart Building",
    coordinates: [43.8171, -111.7807],
  },
  {
    id: "smith",
    name: "Smith Building",
    coordinates: [43.8201, -111.7824],
  },
  {
    id: "snow",
    name: "Snow Building",
    coordinates: [43.8205, -111.7840],
  },
  {
    id: "taylor",
    name: "Taylor Building",
    coordinates: [43.8159, -111.7831],
  },
  {
    id: "benson",
    name: "Benson Building",
    coordinates: [43.8147, -111.7818],
  },
  {
    id: "kimball",
    name: "Kimball Building",
    coordinates: [43.8154, -111.7802],
  },
  {
    id: "hinckley",
    name: "Hinckley Building",
    coordinates: [43.8139, -111.7790],
  },
  {
    id: "clarke",
    name: "Clarke Building",
    coordinates: [43.8192, -111.7801],
  },
  {
    id: "ricks",
    name: "Ricks Building",
    coordinates: [43.8131, -111.7809],
  },
  {
    id: "byui-center",
    name: "BYU-Idaho Center",
    coordinates: [43.8167, -111.7853],
  },
  {
    id: "health-center",
    name: "Student Health Center",
    coordinates: [43.8153, -111.7870],
  },
  {
    id: "visual-arts",
    name: "Visual Arts Studio",
    coordinates: [43.8203, -111.7800],
  },
];