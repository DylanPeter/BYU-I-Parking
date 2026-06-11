import type { ParkingLot } from "../types/parking";
import {
  getAvailabilityColor,
  getAvailabilityLabel,
} from "../utils/availability";

type ParkingLotDetailProps = {
  selectedLot: ParkingLot;
  startTime: string;
  hours: number;
  onBack: () => void;
  onReserve: () => void;
  onStartTimeChange: (time: string) => void;
  onHoursChange: (hours: number) => void;
};

export default function ParkingLotDetail({
  selectedLot,
  startTime,
  hours,
  onBack,
  onReserve,
  onStartTimeChange,
  onHoursChange,
}: ParkingLotDetailProps) {
  const color = getAvailabilityColor(
    selectedLot.availableSpots,
    selectedLot.totalSpots
  );

  return (
    <main className="app">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <section className="detail-card">
        <h1>{selectedLot.name}</h1>
        <p className="muted">{selectedLot.location}</p>

        <div className="availability-big" style={{ background: `${color}18` }}>
          <span style={{ color }}>{selectedLot.availableSpots}</span>
          <p style={{ color }}>
            spots available ·{" "}
            {getAvailabilityLabel(
              selectedLot.availableSpots,
              selectedLot.totalSpots
            )}
          </p>
        </div>

        <div className="lot-info-grid">
          <div>
            <strong>Total Spots</strong>
            <p>{selectedLot.totalSpots}</p>
          </div>
          <div>
            <strong>Distance</strong>
            <p>{selectedLot.distance}</p>
          </div>
          <div>
            <strong>Permits</strong>
            <p>{selectedLot.permitTypes.join(", ")}</p>
          </div>
        </div>

        <div className="form-group">
          <label>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>
            Duration — {hours} {hours === 1 ? "hour" : "hours"} · $
            {(hours * 1.5).toFixed(2)}
          </label>
          <input
            type="range"
            min={1}
            max={12}
            value={hours}
            onChange={(e) => onHoursChange(Number(e.target.value))}
            className="slider"
          />
          <div className="slider-labels">
            <span>1 hr</span>
            <span>12 hrs</span>
          </div>
        </div>

        <button onClick={onReserve}>
          Reserve a Spot — ${(hours * 1.5).toFixed(2)}
        </button>
      </section>
    </main>
  );
}