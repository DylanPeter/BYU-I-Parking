import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import type { ParkingLot } from "../types/parking";
import { getAvailabilityColor } from "../utils/availability";
import {
  campusBuildings,
  type CampusBuilding,
} from "../data/campusBuildings";
type CampusMapProps = {
  lots: ParkingLot[];
  onSelectLot: (lot: ParkingLot) => void;
};

export default function CampusMap({ lots, onSelectLot }: CampusMapProps) {
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
                <i className="legend-dot full"></i> Almost Full
            </span>
            <span>
                <i className="legend-dot building"></i> Building
            </span>
        </div>
      <MapContainer
        key="byui-campus-map-v3"
        center={[43.8176, -111.7836]}
        zoom={16}
        minZoom={15}
        maxZoom={18}
        maxBounds={[
          [43.8125, -111.7905],
          [43.8235, -111.7765],
        ]}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        zoomControl={false}
        className="campus-map"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {lots.map((lot) => {
          const color = getAvailabilityColor(
            lot.availableSpots,
            lot.totalSpots
          );

          return (
            <CircleMarker
              key={lot.id}
              center={[lot.lat, lot.lng]}
              radius={12}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.85,
                weight: 3,
              }}
            >
              <Popup>
                <div className="map-popup">
                  <h3>{lot.name}</h3>
                  <p>{lot.location}</p>
                  <p>
                    <strong>{lot.availableSpots}</strong> / {lot.totalSpots}{" "}
                    spots available
                  </p>
                  <button onClick={() => onSelectLot(lot)}>View Lot</button>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
        {campusBuildings.map((building: CampusBuilding) => (
            <CircleMarker
                key={building.id}   
                center={[building.lat, building.lng]}
                radius={8}
                pathOptions={{
                    color: "#555",
                    fillColor: "#555",
                    fillOpacity: 0.7,
                    weight: 2,
                }}
            >
                <Popup>
                    <div className="map-popup">
                        <h3>{building.name}</h3>
                        <p>{building.description}</p>
                    </div>
                </Popup>
            </CircleMarker>
        ))}
      </MapContainer>
    </section>
  );
}