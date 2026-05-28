import { useState } from "react";
import "./App.css";

type ParkingLot = {
  id: number;
  name: string;
  location: string;
  totalSpots: number;
  availableSpots: number;
  permitTypes: string[];
  distance: string;
};

type Reservation = {
  lot: string;
  startTime: string;
  duration: string;
  code: string;
};

const parkingLots: ParkingLot[] = [
  {
    id: 1,
    name: "Manwaring Lot",
    location: "Near MC / Student Center",
    totalSpots: 120,
    availableSpots: 18,
    permitTypes: ["Student", "Faculty"],
    distance: "0.2 mi",
  },
  {
    id: 2,
    name: "Library Lot",
    location: "Near McKay Library",
    totalSpots: 90,
    availableSpots: 4,
    permitTypes: ["Student"],
    distance: "0.4 mi",
  },
  {
    id: 3,
    name: "Hart Lot",
    location: "Near Hart Building",
    totalSpots: 160,
    availableSpots: 42,
    permitTypes: ["Student", "Visitor"],
    distance: "0.6 mi",
  },
  {
    id: 4,
    name: "Stadium Lot",
    location: "Near Hyrum Manwaring Center",
    totalSpots: 200,
    availableSpots: 67,
    permitTypes: ["Student", "Visitor"],
    distance: "0.8 mi",
  },
];

function getAvailabilityColor(available: number, total: number): string {
  const pct = available / total;
  if (pct > 0.3) return "var(--green)";
  if (pct > 0.1) return "var(--yellow)";
  return "var(--red)";
}

function getAvailabilityLabel(available: number, total: number): string {
  const pct = available / total;
  if (pct > 0.3) return "Open";
  if (pct > 0.1) return "Limited";
  return "Almost Full";
}

function App() {
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [startTime, setStartTime] = useState<string>("10:00");
  const [hours, setHours] = useState<number>(1);

  function reserveLot() {
    if (!selectedLot) return;
    setReservation({
      lot: selectedLot.name,
      startTime,
      duration: hours === 1 ? "1 hour" : `${hours} hours`,
      code: `BYUI-${selectedLot.id}-${Math.floor(Math.random() * 9000 + 1000)}`,
    });
  }

  function resetApp() {
    setSelectedLot(null);
    setReservation(null);
    setStartTime("10:00");
    setHours(1);
  }

  if (reservation) {
    return (
      <main className="app">
        <section className="confirmation-card">
          <div className="success-icon">✓</div>
          <h1>Reservation Confirmed</h1>
          <p>You reserved parking in:</p>
          <h2>{reservation.lot}</h2>
          <div className="reservation-details">
            <p><strong>Start Time:</strong> {reservation.startTime}</p>
            <p><strong>Duration:</strong> {reservation.duration}</p>
            <p><strong>Cost:</strong> ${(hours * 1.5).toFixed(2)}</p>
          </div>
          <div className="qr-box">
            <span>{reservation.code}</span>
          </div>
          <p className="small-text">
            Show this code if campus parking needs to verify your reservation.
          </p>
          <button onClick={resetApp}>Back to Lots</button>
        </section>
      </main>
    );
  }

  if (selectedLot) {
    const color = getAvailabilityColor(selectedLot.availableSpots, selectedLot.totalSpots);
    return (
      <main className="app">
        <button className="back-button" onClick={() => setSelectedLot(null)}>
          ← Back
        </button>
        <section className="detail-card">
          <h1>{selectedLot.name}</h1>
          <p className="muted">{selectedLot.location}</p>

          <div className="availability-big" style={{ background: `${color}18` }}>
            <span style={{ color }}>{selectedLot.availableSpots}</span>
            <p style={{ color }}>
              spots available · {getAvailabilityLabel(selectedLot.availableSpots, selectedLot.totalSpots)}
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
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Duration — {hours} {hours === 1 ? "hour" : "hours"} · ${(hours * 1.5).toFixed(2)}</label>
            <input
              type="range"
              min={1}
              max={12}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>1 hr</span>
              <span>12 hrs</span>
            </div>
          </div>

          <button onClick={reserveLot}>Reserve a Spot — ${(hours * 1.5).toFixed(2)}</button>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">BYU-Idaho Transit</p>
        <h1>Find and reserve campus parking.</h1>
        <p>Check live availability, reserve a spot, and get a quick confirmation pass.</p>
      </section>

      <section className="lot-list">
        {parkingLots.map((lot) => {
          const color = getAvailabilityColor(lot.availableSpots, lot.totalSpots);
          const label = getAvailabilityLabel(lot.availableSpots, lot.totalSpots);
          return (
            <article key={lot.id} className="lot-card">
              <div className="lot-card-top">
                <div>
                  <h2>{lot.name}</h2>
                  <p>{lot.location}</p>
                </div>
                <div className="availability-badge" style={{ background: `${color}18`, color }}>
                  <span className="availability-number">{lot.availableSpots}</span>
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

              <button onClick={() => setSelectedLot(lot)}>View Lot</button>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default App;
