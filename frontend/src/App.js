import { useEffect, useState } from "react";
import { getAllLiveSatellites } from "./api";
import MapView from "./components/MapView";

function App() {
  const [liveData, setLiveData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [clearTrigger, setClearTrigger] = useState(false);
  const [selectedSatellite, setSelectedSatellite] = useState(null);

  // 🔥 Load satellites once
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await getAllLiveSatellites();
      setLiveData(res.data);
      setLoading(false);
    };

    load();
  }, []);

  // 📍 Area filter
  const handleAreaSelect = (area) => {
    const filtered = liveData.filter(
      (sat) =>
        sat.latitude <= area.north &&
        sat.latitude >= area.south &&
        sat.longitude <= area.east &&
        sat.longitude >= area.west
    );

    setAreaData(filtered);
  };

  /* ===============================
     🔍 + 📍 FINAL DISPLAY LOGIC
  =============================== */

  let displayData = [];

  // Case 1: Area selected
  if (areaData.length > 0) {
    displayData = areaData;
  } else {
    // Case 2: No area selected
    displayData = liveData;
  }

  // If search typed → filter inside active data
  if (search.trim() !== "") {
    displayData = displayData.filter((sat) =>
      sat.name?.toLowerCase().includes(search.toLowerCase())
    );
  }

  // If no area & no search → show nothing
  if (areaData.length === 0 && search.trim() === "") {
    displayData = [];
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Satellite Tracking Platform</h2>

      {/* 🎛 Buttons */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setSelectMode(true)}>
          Start Area Selection
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => {
            setAreaData([]);
            setClearTrigger(!clearTrigger);
            setSelectMode(false);
          }}
        >
          Clear Area
        </button>
      </div>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search satellite..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "10px",
          width: "300px"
        }}
      />

      {loading && <p>Loading satellites...</p>}

      {/* 🗺 Map */}
      <MapView
        data={displayData}
        onAreaSelect={handleAreaSelect}
        selectMode={selectMode}
        clearTrigger={clearTrigger}
        onSelectSatellite={setSelectedSatellite}
      />

      <h3>Satellites Showing: {displayData.length}</h3>

      {/* 📋 List */}
      <div
        style={{
          maxHeight: "200px",
          overflowY: "scroll",
          border: "1px solid #ddd",
          padding: "10px"
        }}
      >
        {displayData.map((sat) => (
          <div key={sat.norad_id}>
            <strong>{sat.name}</strong> — Alt:{" "}
            {sat.altitude?.toFixed(2)} km
          </div>
        ))}
      </div>

      {/* 📋 Detail Panel */}
      {selectedSatellite && (
        <div
          style={{
            position: "fixed",
            right: "20px",
            top: "100px",
            width: "300px",
            background: "white",
            padding: "15px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            borderRadius: "8px",
            zIndex: 9999
          }}
        >
          <h3>{selectedSatellite.name}</h3>
          <p><b>NORAD:</b> {selectedSatellite.norad_id}</p>
          <p><b>Latitude:</b> {selectedSatellite.latitude.toFixed(2)}</p>
          <p><b>Longitude:</b> {selectedSatellite.longitude.toFixed(2)}</p>
          <p><b>Altitude:</b> {selectedSatellite.altitude?.toFixed(2)} km</p>

          <button onClick={() => setSelectedSatellite(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
