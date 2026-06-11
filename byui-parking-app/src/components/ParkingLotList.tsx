import type { ParkingLot } from "../types/parking";
import {
  getAvailabilityColor,
  getAvailabilityLabel,
} from "../utils/availability";

type ParkingLotListProps = {
  lots: ParkingLot[];
  onSelectLot: (lot: ParkingLot) => void;
};

export default function ParkingLotList({
  lots,
  onSelectLot,
}: ParkingLotListProps) {
  return (
    <section className="lot-list">
      {lots.map((lot) => {
        const color = getAvailabilityColor(lot.availableSpots, lot.totalSpots);
        const label = getAvailabilityLabel(lot.availableSpots, lot.totalSpots);

        return (
          <article key={lot.id} className="lot-card">
            <div className="lot-card-top">
              <div>
                <h2>{lot.name}</h2>
                <p>{lot.location}</p>
              </div>

              <div
                className="availability-badge"
                style={{ background: `${color}18`, color }}
              >
                <span className="availability-number">
                  {lot.availableSpots}
                </span>
                <span className="availability-label">{label}</span>
              </div>
            </div>

            <div className="lot-bar-wrap">
              <div
                className="lot-bar-fill"
                style={{
                  width: `${(lot.availableSpots / lot.totalSpots) * 100}%`,
                  background: color,
                }}
              />
            </div>

            <div className="lot-meta">
              <span>{lot.distance}</span>
              <span>{lot.permitTypes.join(" / ")}</span>
            </div>

            <button onClick={() => onSelectLot(lot)}>View Lot</button>
          </article>
        );
      })}
    </section>
  );
}