import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import type { ParkingLot } from "../data/parkingData";
import { getAvailabilityColor } from "../utils/availability";
import {useEffect} from "react";
import { useMap } from "react-leaflet";

function ResizeMap() {

  const map = useMap();

  useEffect(() => {

    setTimeout(() => {

      map.invalidateSize();

    }, 100);

  }, [map]);

  return null;

}

type CampusMapProps = {
  lots: ParkingLot[];
  selectedLotId?: string;
  onSelectLot: (lot: ParkingLot) => void;
};

export default function CampusMap({ lots, selectedLotId, onSelectLot }: CampusMapProps) {
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
      </div>

      <MapContainer
        key="byui-campus-map"
        center={[43.8176, -111.7836]}
        zoom={15}
        minZoom={14}
        maxZoom={18}
        scrollWheelZoom={true}
        zoomControl={false}
        className="campus-map"
      >
        <ResizeMap />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

   {lots.map((lot) => {
  const color =
    lot.status === "Open"
      ? "#06a77d"
      : lot.status === "Limited"
      ? "#d4840a"
      : "#c0392b";

  const isSelected = lot.id === selectedLotId;

  return (
    <CircleMarker
      key={lot.id}
      center={lot.coordinates}
      radius={isSelected ? 18 : 12}
      pathOptions={{
        color,
        fillColor: color,
        fillOpacity: 0.9,
        weight: isSelected ? 4 : 2,
      }}
      eventHandlers={{
        click: () => onSelectLot(lot),
      }}
    >
      <Popup>
        <div className="map-popup">
          <h3>{lot.name}</h3>
          <p>
            <strong>{lot.availableSpots}</strong> / {lot.totalSpots} spots available
          </p>
          <p>Status: {lot.status}</p>
        </div>
      </Popup>
    </CircleMarker>
  );
})}
      </MapContainer>
    </section>
  );
}