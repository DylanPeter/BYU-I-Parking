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
];

function App() {
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);

  const [reservation, setReservation] = useState<Reservation | null>(null);

  const [startTime, setStartTime] = useState<string>("10:00");

  const [duration, setDuration] = useState<string>("60");

  function reserveLot() {
    if (!selectedLot) return;

    const newReservation: Reservation = {
      lot: selectedLot.name,
      startTime,
      duration,
      code: `BYUI-${selectedLot.id}-${Math.floor(
        Math.random() * 9000 + 1000
      )}`,
    };

    setReservation(newReservation);
  }

  function resetApp() {
    setSelectedLot(null);
    setReservation(null);
    setStartTime("10:00");
    setDuration("60");
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
            <p>
              <strong>Start Time:</strong> {reservation.startTime}
            </p>

            <p>
              <strong>Duration:</strong> {reservation.duration} minutes
            </p>
          </div>

          <div className="qr-box">
            <span>{reservation.code}</span>
          </div>

          <p className="small-text">
            Show this QR/pass code if campus parking needs to verify your
            reservation.
          </p>

          <button onClick={resetApp}>Back to Lots</button>
        </section>
      </main>
    );
  }

  if (selectedLot) {
    return (
      <main className="app">
        <button
          className="back-button"
          onClick={() => setSelectedLot(null)}
        >
          ← Back
        </button>

        <section className="detail-card">
          <h1>{selectedLot.name}</h1>

          <p className="muted">{selectedLot.location}</p>

          <div className="availability-big">
            <span>{selectedLot.availableSpots}</span>
            <p>spots available</p>
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
            <label>Reservation Length</label>

            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          <button onClick={reserveLot}>
            Reserve a Spot in This Lot
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">BYU-I Parking</p>

        <h1>Find and reserve campus parking.</h1>

        <p>
          Check available lots, reserve a spot in a lot, and get a quick
          confirmation pass.
        </p>
      </section>

      <section className="lot-list">
        {parkingLots.map((lot) => (
          <article key={lot.id} className="lot-card">
            <div>
              <h2>{lot.name}</h2>
              <p>{lot.location}</p>
            </div>

            <div className="availability">
              <span>{lot.availableSpots}</span>
              <p>open spots</p>
            </div>

            <div className="lot-meta">
              <span>{lot.distance}</span>
              <span>{lot.permitTypes.join(" / ")}</span>
            </div>

            <button onClick={() => setSelectedLot(lot)}>
              View Lot
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;