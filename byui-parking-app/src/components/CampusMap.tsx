import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Tooltip,
  Polygon,
  Polyline,
} from "react-leaflet";
import type { ParkingLot } from "../data/parkingData";
import { Fragment, useEffect, useState } from "react";
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
  const recommendedLot = lots.find((lot) => lot.id === recommendedLotId);
  const [mapStyle, setMapStyle] = useState<"standard" | "satellite">("standard");

  return (
    <section className="map-section">
      <div className="map-legend">
        <span><i className="legend-dot open"></i> Open</span>
        <span><i className="legend-dot limited"></i> Limited</span>
        <span><i className="legend-dot full"></i> Full</span>
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
        center={[43.8176, -111.7836]}
        zoom={15}
        minZoom={14}
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

        {selectedDestination && recommendedLot && (
          <Polyline
            positions={[recommendedLot.coordinates, selectedDestination.coordinates]}
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
          const color =
            lot.status === "Open"
              ? "#06a77d"
              : lot.status === "Limited"
              ? "#d4840a"
              : "#c0392b";

          const isSelected = lot.id === selectedLotId;
          const isRecommended = lot.id === recommendedLotId;

          return (
            <Fragment key={lot.id}>
              {lot.boundary && lot.boundary.length > 0 && (
                <Polygon
                  positions={lot.boundary}
                  pathOptions={{
                    color,  
                    fillColor: color,
                    fillOpacity: isRecommended ? 0.45 : isSelected ? 0.35 : 0.25,
                    weight: isRecommended ? 5 : isSelected ? 4 : 2,
                  }}
                  eventHandlers={{
                    click: () => onSelectLot(lot),
                  }}
                />
              )}

              <CircleMarker
                center={lot.coordinates}
                radius={isRecommended ? 10 : isSelected ? 9 : 7}
                pathOptions={{
                  color,
                  fillColor: color,
                  fillOpacity: 0.9,
                  weight: isRecommended ? 5 : isSelected ? 4 : 2,
                }}
                eventHandlers={{
                  click: () => onSelectLot(lot),
                }}
              >
                <Tooltip permanent direction="top" offset={[0, -5]}>
                  {isRecommended ? `⭐ ${lot.name}` : lot.name}
                </Tooltip>

                <Popup>
                  <div className="map-popup">
                    <h3>{lot.name}</h3>
                    <p>
                      {lot.availableSpots} / {lot.totalSpots} spots available
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            </Fragment>
          );
        })}
      </MapContainer>
    </section>
  );
}