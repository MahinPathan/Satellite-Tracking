from fastapi import APIRouter
from services.celestrak_service import fetch_and_parse_tle
from services.n2yo_service import get_live_position
import json

router = APIRouter()

@router.get("/update-tle")
def update_tle():
    count = fetch_and_parse_tle()
    return {"status": "updated", "total": count}

@router.get("/satellites")
def list_satellites():
    with open("data/satellites.json") as f:
        return json.load(f)

@router.get("/satellite/live")
def satellite_live(norad_id: int, lat: float, lng: float):
    data = get_live_position(norad_id, lat, lng)

    if "positions" not in data:
        return {"error": "No live data"}

    pos = data["positions"][0]

    return {
        "latitude": pos["satlatitude"],
        "longitude": pos["satlongitude"],
        "altitude": pos["sataltitude"],
        "speed": pos["satvelocity"],
        "timestamp": pos["timestamp"]
    }
