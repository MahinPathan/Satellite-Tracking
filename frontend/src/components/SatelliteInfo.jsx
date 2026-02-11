function SatelliteInfo({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Selected Satellites</h3>

      {data.map((sat) => (
        <div key={sat.norad_id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px"
        }}>
          <p><b>NORAD:</b> {sat.norad_id}</p>
          <p><b>Latitude:</b> {sat.latitude}</p>
          <p><b>Longitude:</b> {sat.longitude}</p>
          <p><b>Altitude:</b> {sat.altitude} km</p>
          <p><b>Speed:</b> {sat.speed ?? "N/A"}</p>
        </div>
      ))}
    </div>
  );
}

export default SatelliteInfo;
