import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapView({ data }) {
  if (!data) return null;

  return (
    <MapContainer
      center={[data.latitude, data.longitude]}
      zoom={4}
      style={{ height: "400px", marginTop: "20px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[data.latitude, data.longitude]}>
        <Popup>
          Altitude: {data.altitude ?? "N/A"} km <br />
          Speed: {data.speed ?? "N/A"}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapView;
