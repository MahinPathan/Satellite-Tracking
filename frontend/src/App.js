import { useEffect, useState } from "react";
import { getSatellites, getLiveSatellite } from "./api";
import SatelliteSelector from "./components/SatelliteSelector";
import SatelliteInfo from "./components/SatelliteInfo";
import MapView from "./components/MapView";

function App() {
  const [satellites, setSatellites] = useState([]);
  const [liveData, setLiveData] = useState(null);

  useEffect(() => {
    getSatellites().then(res => setSatellites(res.data));
  }, []);

  const handleSelect = (noradId) => {
    if (!noradId) return;

    getLiveSatellite({
      norad_id: noradId,
      lat: 21.1,
      lng: 79.0,
    }).then(res => setLiveData(res.data));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Satellite Tracking Platform</h2>

      <SatelliteSelector
        satellites={satellites}
        onSelect={handleSelect}
      />

      <SatelliteInfo data={liveData} />

      <MapView data={liveData} />
    </div>
  );
}

export default App;
