function SatelliteInfo({ data }) {
  if (!data) return null;

  return (
    <div style={{
      marginTop: "20px",
      padding: "15px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      maxWidth: "400px"
    }}>
      <h3>Satellite Details</h3>
      <p><b>Latitude:</b> {data.latitude}</p>
      <p><b>Longitude:</b> {data.longitude}</p>
      <p><b>Altitude:</b> {data.altitude} km</p>
      <p><b>Speed:</b> {data.speed ?? "N/A"} km/s</p>
      <p><b>Last Update:</b> {new Date(data.timestamp * 1000).toLocaleString()}</p>
    </div>
  );
}

export default SatelliteInfo;
