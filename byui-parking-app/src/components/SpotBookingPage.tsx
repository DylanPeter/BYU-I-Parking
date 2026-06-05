import { useState } from 'react';
import type { FormEvent } from 'react';
import { useParking } from '../context/ParkingContext';

export default function SpotBookingPage() {
  const { state, reserveSpot } = useParking();
  const [selectedLot, setSelectedLot] = useState(state.lots[0]?.id ?? '');
  const [selectedSpot, setSelectedSpot] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [hours, setHours] = useState<number>(1);
  const [message, setMessage] = useState('');

  const currentLot = state.lots.find((lot) => lot.id === selectedLot);
  const lotSpots = state.spots.filter((spot) => spot.lotId === selectedLot);
  const chosenSpot = state.spots.find((spot) => spot.id === selectedSpot);
  const cost = hours * 1.5;

  const handleReserve = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedLot || !selectedSpot) return;
    reserveSpot(selectedLot, selectedSpot, startTime, hours, chosenSpot?.label);
    setMessage(`Reserved ${chosenSpot?.label || 'spot'} in ${currentLot?.name || 'lot'} for ${hours} hour(s).`);
  };

  return (
    <div className="detail-card booking-card">
      <div className="booking-header">
        <div>
          <h2>Parking Bay Spot Selector</h2>
          <p className="muted">Reserve your spot in seconds and track the cost before confirming.</p>
        </div>
        <div className="lot-summary-pill">
          <span>{currentLot?.availableSpots ?? 0} spots available</span>
          <strong>{currentLot?.status ?? 'Unknown'}</strong>
        </div>
      </div>

      <div className="spot-grid-panel">
        <div className="form-group">
          <label htmlFor="lot-select">Select Parking Lot</label>
          <select id="lot-select" value={selectedLot} onChange={(e) => {
            setSelectedLot(e.target.value);
            setSelectedSpot('');
          }}>
            {state.lots.map((lot) => (
              <option key={lot.id} value={lot.id}>
                {lot.name} — {lot.availableSpots} open
              </option>
            ))}
          </select>
        </div>

        <div className="spot-grid">
          {lotSpots.map((spot) => (
            <button
              key={spot.id}
              type="button"
              className={`spot-card ${spot.status.toLowerCase()} ${spot.id === selectedSpot ? 'selected' : ''}`}
              onClick={() => spot.status === 'Available' && setSelectedSpot(spot.id)}
              disabled={spot.status !== 'Available'}
            >
              <span>{spot.label}</span>
              <small>
                {spot.status === 'Available'
                  ? spot.accessible
                    ? '♿ Accessible'
                    : spot.evCharging
                    ? '⚡ EV'
                    : spot.compact
                    ? '🚗 Compact'
                    : 'Available'
                  : spot.status}
              </small>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleReserve} className="booking-form">

        <div className="form-group split">
          <div>
            <label htmlFor="start-time">Start Time</label>
            <input type="time" id="start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div>
            <label htmlFor="booking-hours">Duration: {hours} hour(s)</label>
            <input type="range" id="booking-hours" min={1} max={12} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="slider" />
          </div>
        </div>

        <div className="reservation-summary">
          <div>
            <span>Hourly Rate</span>
            <strong>$1.50</strong>
          </div>
          <div>
            <span>Total Cost</span>
            <strong>${cost.toFixed(2)}</strong>
          </div>
        </div>

        {message && <div className="toast success">{message}</div>}

        <button type="submit">Confirm Reservation</button>
      </form>
    </div>
  );
}
