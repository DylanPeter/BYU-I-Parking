import { destinations } from "../data/destinations";

type DestinationSearchProps = {
  selectedDestination: string;
  onChange: (destinationId: string) => void;
};

export default function DestinationSearch({
  selectedDestination,
  onChange,
}: DestinationSearchProps) {
  return (
    <section className="filter-card">
      <label htmlFor="destination-search">Where are you going?</label>
      <select
        id="destination-search"
        value={selectedDestination}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Choose a building</option>
        {destinations.map((destination) => (
          <option key={destination.id} value={destination.id}>
            {destination.name}
          </option>
        ))}
      </select>
    </section>
  );
}