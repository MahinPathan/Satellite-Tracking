import {
  MapContainer,
  TileLayer,
  Marker,
  Rectangle,
  useMapEvents
} from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* 🛰 Satellite Icon */
const satelliteIcon = new L.Icon({
  iconUrl: "/satellite.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

/* 📍 Area Selector */
function AreaSelector({ selectMode, onAreaSelect, clearTrigger }) {
  const [points, setPoints] = useState([]);
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    setBounds(null);
    setPoints([]);
  }, [clearTrigger]);

  useMapEvents({
    click(e) {
      if (!selectMode) return;

      const newPoints = [...points, e.latlng];

      if (newPoints.length === 2) {
        const p1 = newPoints[0];
        const p2 = newPoints[1];

        const north = Math.max(p1.lat, p2.lat);
        const south = Math.min(p1.lat, p2.lat);
        const east = Math.max(p1.lng, p2.lng);
        const west = Math.min(p1.lng, p2.lng);

        setBounds([
          [south, west],
          [north, east]
        ]);

        onAreaSelect({ north, south, east, west });
        setPoints([]);
      } else {
        setPoints(newPoints);
      }
    }
  });

  return bounds ? (
    <Rectangle bounds={bounds} pathOptions={{ color: "blue" }} />
  ) : null;
}

/* 🗺 Main Map */
function MapView({
  data,
  onAreaSelect,
  selectMode,
  clearTrigger,
  selectedSatellite,
  onSelectSatellite
}) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      
      {/* MAP */}
      <div style={{ flex: 3 }}>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <AreaSelector
            selectMode={selectMode}
            onAreaSelect={onAreaSelect}
            clearTrigger={clearTrigger}
          />

          {data.map((sat) => (
            <Marker
              key={sat.norad_id}
              position={[sat.latitude, sat.longitude]}
              icon={satelliteIcon}
              eventHandlers={{
                click: () => onSelectSatellite(sat)
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* RIGHT PANEL */}
      <div
        style={{
          flex: 1,
          background: "#f4f4f4",
          padding: "20px",
          borderRadius: "10px",
          height: "500px",
          overflowY: "auto"
        }}
      >
        <h3>Satellite Details</h3>

        {!selectedSatellite ? (
          <p>Select a satellite from map</p>
        ) : (
          <>
            <h4>{selectedSatellite.name}</h4>
            <p>NORAD: {selectedSatellite.norad_id}</p>
            <p>Altitude: {selectedSatellite.altitude?.toFixed(2)} km</p>
            <p>Latitude: {selectedSatellite.latitude?.toFixed(2)}</p>
            <p>Longitude: {selectedSatellite.longitude?.toFixed(2)}</p>

            <button
              onClick={() => onSelectSatellite(null)}
              style={{ marginTop: "10px" }}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MapView;
