import { useState } from "react";

function SatelliteSelector({ satellites, onSelect }) {
  const [query, setQuery] = useState("");

  const filtered = satellites.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search satellite..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: "10px", width: "250px" }}
      />

      <br />

      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select Satellite</option>
        {filtered.slice(0, 200).map((sat) => (
          <option key={sat.norad_id} value={sat.norad_id}>
            {sat.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SatelliteSelector;
