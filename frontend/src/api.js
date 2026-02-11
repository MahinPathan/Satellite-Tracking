import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
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
