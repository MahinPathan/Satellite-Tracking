import { useState } from "react";

function SatelliteSelector({ satellites, onSelect }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);

  const filtered = satellites.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (e) => {
    const options = [...e.target.selectedOptions];
    const values = options.map(o => o.value);
    setSelected(values);
    onSelect(values);
  };

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

      <select multiple size="6" onChange={handleChange}>
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
