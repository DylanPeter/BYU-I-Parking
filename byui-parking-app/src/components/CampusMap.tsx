import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Tooltip,
  Polyline,
  useMap,
} from "react-leaflet";
import type { ParkingLot } from "../data/parkingData";
import { useEffect, useState } from "react";

function ResizeMap() {
  const map = useMap();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => window.clearTimeout(timeoutId);
  }, [map]);

  return null;
}

type CampusMapProps = {
  lots: ParkingLot[];
  selectedLotId?: string;
  recommendedLotId?: string;
  selectedDestination?: {
    id: string;
    name: string;
    coordinates: [number, number];
  };
  onSelectLot: (lot: ParkingLot) => void;
};

export default function CampusMap({
  lots,
  selectedLotId,
  recommendedLotId,
  selectedDestination,
  onSelectLot,
}: CampusMapProps) {
  const [mapStyle, setMapStyle] = useState<"standard" | "satellite">(
    "standard"
  );

  const selectedLot = lots.find((lot) => lot.id === selectedLotId);
  const recommendedLot = lots.find((lot) => lot.id === recommendedLotId);

  const routeLot = recommendedLot ?? selectedLot;

  return (
    <section className="map-section">
      <div className="map-legend">
        <span>
          <i className="legend-dot open"></i> Open
        </span>

        <span>
          <i className="legend-dot limited"></i> Limited
        </span>

        <span>
          <i className="legend-dot full"></i> Full
        </span>

        <span>
          <i className="legend-dot building"></i> Destination
        </span>
      </div>

      <div className="map-style-toggle">
        <button
          type="button"
          className={mapStyle === "standard" ? "active" : ""}
          onClick={() => setMapStyle("standard")}
        >
          Standard
        </button>

        <button
          type="button"
          className={mapStyle === "satellite" ? "active" : ""}
          onClick={() => setMapStyle("satellite")}
        >
          Satellite
        </button>
      </div>

      <MapContainer
        key="byui-campus-map"
        center={[43.8168, -111.7835]}
        zoom={16}
        minZoom={14}
        maxZoom={18}
        maxBounds={[
          [43.8100, -111.7915],
          [43.8235, -111.7760],
        ]}
        maxBoundsViscosity={1}
        scrollWheelZoom={true}
        zoomControl={false}
        className="campus-map"
      >
        <ResizeMap />

        <TileLayer
          key={mapStyle}
          attribution={
            mapStyle === "standard"
              ? "&copy; OpenStreetMap contributors & CARTO"
              : "Tiles &copy; Esri"
          }
          url={
            mapStyle === "standard"
              ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              : "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          }
        />

        {selectedDestination && routeLot && (
          <Polyline
            positions={[
              routeLot.coordinates,
              selectedDestination.coordinates,
            ]}
            pathOptions={{
              color: "#214491",
              weight: 4,
              dashArray: "8 8",
            }}
          />
        )}

        {selectedDestination && (
          <CircleMarker
            center={selectedDestination.coordinates}
            radius={10}
            pathOptions={{
              color: "#214491",
              fillColor: "#ffffff",
              fillOpacity: 1,
              weight: 4,
            }}
          >
            <Tooltip permanent direction="top" offset={[0, -8]}>
              {selectedDestination.name}
            </Tooltip>
          </CircleMarker>
        )}

        {lots.map((lot) => {
          const isSelected = lot.id === selectedLotId;
          const isRecommended = lot.id === recommendedLotId;

          const lotColor =
            lot.status === "Open"
              ? "#22c55e"
              : lot.status === "Limited"
                ? "#f59e0b"
                : "#ef4444";

          return (
            <CircleMarker
              key={lot.id}
              center={lot.coordinates}
              radius={isSelected || isRecommended ? 15 : 11}
              pathOptions={{
                color: isSelected
                  ? "#2563eb"
                  : isRecommended
                    ? "#9333ea"
                    : lotColor,
                fillColor: lotColor,
                fillOpacity: 0.9,
                weight: isSelected || isRecommended ? 4 : 2,
              }}
              eventHandlers={{
                click: () => onSelectLot(lot),
              }}
            >
              <Tooltip direction="top" offset={[0, -8]}>
                <strong>{lot.name}</strong>
                <br />
                {lot.availableSpots} spots available
              </Tooltip>

              <Popup>
                <div className="map-popup">
                  <h3>{lot.name}</h3>

                  <p>
                    <strong>{lot.availableSpots}</strong> of{" "}
                    {lot.totalSpots} spots available
                  </p>

                  <p>Status: {lot.status}</p>

                  <button
                    type="button"
                    onClick={() => onSelectLot(lot)}
                    disabled={lot.status === "Full"}
                  >
                    {lot.status === "Full" ? "Lot Full" : "Select Lot"}
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </section>
  );
}