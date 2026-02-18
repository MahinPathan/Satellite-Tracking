import axios from "axios";

const API = axios.create({
  baseURL: "https://satellite-tracking-ayri.onrender.com",
  timeout: 20000, // ⬅ increase timeout (Skyfield calculation heavy ho sakta hai)
});

// 📄 Get satellite list (TLE database)
export const getSatellites = () => {
  return API.get("/satellites");
};

// 🛰 Get ALL live satellites (Skyfield engine)
export const getAllLiveSatellites = () => {
  return API.get("/satellites/live-all");
};
