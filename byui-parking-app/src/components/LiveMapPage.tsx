import { useState } from "react";
import { useParking } from "../context/ParkingContext";
import type { ParkingLot } from "../data/parkingData";

import DestinationSearch from "../components/DestinationSearch";
import CampusMap from "../components/CampusMap";
import { destinations } from "../data/destinations";

export default function LiveMapPage() {
  const { state } = useParking();

  const [selectedLotId, setSelectedLotId] = useState(
    state.lots[0]?.id ?? ""
  );
  const [selectedDestination, setSelectedDestination] = useState("");

  const selectedLot = state.lots.find((lot) => lot.id === selectedLotId);

  const lotSpots = state.spots.filter(
    (spot) => spot.lotId === selectedLotId
  );

  const availableCount = lotSpots.filter(
    (spot) => spot.status === "Available"
  ).length;

  const reservedCount = lotSpots.filter(
    (spot) => spot.status === "Reserved"
  ).length;

  const occupiedCount = lotSpots.filter(
    (spot) => spot.status === "Occupied"
  ).length;

  const recommendedLots = selectedDestination
    ? [...state.lots].sort((a, b) => {
        const aWalk = a.walkMinutes?.[selectedDestination] ?? 999;
        const bWalk = b.walkMinutes?.[selectedDestination] ?? 999;

        if (aWalk !== bWalk) {
          return aWalk - bWalk;
        }

        return b.availableSpots - a.availableSpots;
      })
    : state.lots;

  const recommendedLot = selectedDestination
    ? recommendedLots[0]
    : undefined;

  const selectedDestinationData = destinations.find(
    (destination) => destination.id === selectedDestination
  );

  const handleSelectLot = (lot: ParkingLot) => {
    setSelectedLotId(lot.id);
  };

  return (
    <div className="lot-list">
      <section className="detail-card hero-card">
        <div>
          <p className="eyebrow">Active Infrastructure Alert</p>
          <h2>Live Parking Availability</h2>
          <p className="muted">
            Monitor current open lots and select a destination to view the best
            parking option.
          </p>
        </div>

        <div className="alert-pill">
          Construction delays near the I-Center perimeter lanes
        </div>
      </section>

      <section className="detail-card">
        <div className="map-preview">
          <DestinationSearch
            selectedDestination={selectedDestination}
            onChange={setSelectedDestination}
          />

          {recommendedLot && (
            <section className="recommendation-card">
              <p className="eyebrow">Recommended Parking</p>

              <h3>⭐ {recommendedLot.name}</h3>

              <p>
                {recommendedLot.walkMinutes[selectedDestination]} minute walk
              </p>

              <p>{recommendedLot.availableSpots} spaces available</p>

              <p>
                Status: <strong>{recommendedLot.status}</strong>
              </p>
            </section>
          )}

          <CampusMap
            lots={recommendedLots}
            selectedLotId={selectedLotId}
            recommendedLotId={recommendedLot?.id}
            selectedDestination={selectedDestinationData}
            onSelectLot={handleSelectLot}
          />

          <div className="map-meta">
            <span>Zoom: 100%</span>
            <span>Layers: Parking Lots</span>
            <span>Status: Live</span>
          </div>
        </div>

        <h3>Available Lots</h3>

        <div className="lot-grid">
          {recommendedLots.map((lot) => (
            <button
              key={lot.id}
              type="button"
              className={
                lot.id === selectedLotId
                  ? "lot-card selected"
                  : "lot-card"
              }
              onClick={() => setSelectedLotId(lot.id)}
            >
              <strong>{lot.name}</strong>

              <span>{lot.availableSpots} open</span>

              {selectedDestination &&
                lot.walkMinutes?.[selectedDestination] && (
                  <span>
                    {lot.walkMinutes[selectedDestination]} min walk
                  </span>
                )}

              {lot.id === recommendedLot?.id && (
                <small>⭐ Recommended</small>
              )}

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

            <p>
              {selectedLot.availableSpots} available of{" "}
              {selectedLot.totalSpots} total
            </p>

            <p>
              Status: <strong>{selectedLot.status}</strong>
            </p>
          </div>
        )}
      </section>
    </div>
  );
}