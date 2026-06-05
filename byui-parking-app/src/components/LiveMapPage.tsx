import { useState } from 'react';
import { useParking } from '../context/ParkingContext';

export default function LiveMapPage() {
  const { state } = useParking();
  const [selectedLotId, setSelectedLotId] = useState(state.lots[0]?.id ?? '');
  const selectedLot = state.lots.find((lot) => lot.id === selectedLotId);
  const lotSpots = state.spots.filter((spot) => spot.lotId === selectedLotId);
  const availableCount = lotSpots.filter((spot) => spot.status === 'Available').length;
  const reservedCount = lotSpots.filter((spot) => spot.status === 'Reserved').length;
  const occupiedCount = lotSpots.filter((spot) => spot.status === 'Occupied').length;

  return (
    <div className="lot-list">
      <section className="detail-card hero-card">
        <div>
          <p className="eyebrow">Active Infrastructure Alert</p>
          <h2>Live Parking Availability</h2>
          <p className="muted">Monitor current open lots and select a sector to view summary details.</p>
        </div>
        <div className="alert-pill">Construction delays near the I-Center perimeter lanes</div>
      </section>

      <section className="detail-card">
        <div className="map-preview">
          <div className="map-placeholder">Campus map preview</div>
          <div className="map-meta">
            <span>Zoom: 100%</span>
            <span>Layers: Parking lots</span>
            <span>Status: Live</span>
          </div>
        </div>

        <h3>Available Lots</h3>
        <div className="lot-grid">
          {state.lots.map((lot) => (
            <button
              key={lot.id}
              type="button"
              className={lot.id === selectedLotId ? 'lot-card selected' : 'lot-card'}
              onClick={() => setSelectedLotId(lot.id)}
            >
              <strong>{lot.name}</strong>
              <span>{lot.availableSpots} open</span>
              <small>{lot.status}</small>
            </button>
          ))}
        </div>

        {selectedLot && (
          <div className="lot-summary-card">
            <h3>{selectedLot.name}</h3>
            <div className="lot-detail-grid">
              <div>
                <p className="stat-card-label">Available</p>
                <strong>{availableCount}</strong>
              </div>
              <div>
                <p className="stat-card-label">Reserved</p>
                <strong>{reservedCount}</strong>
              </div>
              <div>
                <p className="stat-card-label">Occupied</p>
                <strong>{occupiedCount}</strong>
              </div>
            </div>
            <p>{selectedLot.availableSpots} available of {selectedLot.totalSpots} total</p>
            <p>Status: <strong>{selectedLot.status}</strong></p>
          </div>
        )}
      </section>
    </div>
  );
}
