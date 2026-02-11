from fastapi import APIRouter
from pathlib import Path
import json

from backend.services.celestrak_service import update_satellites
from backend.services.n2yo_service import get_live_position
import backend.services.orbit_service as orbit_service

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
SAT_FILE = DATA_DIR / "satellites.json"


@router.get("/update-tle")
def update_tle():
    total = update_satellites()
    return {"status": "ok", "total": total}


@router.get("/satellites")
def satellites():
    if not SAT_FILE.exists():
        return {"error": "Satellite data not found. Run /update-tle first."}

    with open(SAT_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


@router.get("/satellite/live")
def satellite_live(norad_id: int, lat: float, lng: float):
    data = get_live_position(norad_id, lat, lng)

    if "positions" not in data or not data["positions"]:
        return {"error": "No live data available"}

    pos = data["positions"][0]

    return {
        "latitude": pos.get("satlatitude"),
        "longitude": pos.get("satlongitude"),
        "altitude": pos.get("sataltitude"),
        "speed": pos.get("satvelocity"),
        "timestamp": pos.get("timestamp"),
    }


@router.get("/satellites/live-all")
def satellites_live_all():
    return orbit_service.cached_positions
