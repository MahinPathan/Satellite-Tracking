from skyfield.api import EarthSatellite, load
from datetime import datetime, timezone
import json
from pathlib import Path
import threading
import time

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
SAT_FILE = DATA_DIR / "satellites.json"

ts = load.timescale()

cached_positions = []
is_running = False


def calculate_all_positions():
    global cached_positions

    if not SAT_FILE.exists():
        return []

    with open(SAT_FILE, "r", encoding="utf-8") as f:
        satellites = json.load(f)

    now = datetime.now(timezone.utc)
    t = ts.from_datetime(now)

    results = []

    for sat in satellites:
        try:
            tle = sat["tle"]

            satellite = EarthSatellite(
                tle["line1"],
                tle["line2"],
                sat["name"],
                ts
            )

            geocentric = satellite.at(t)
            subpoint = geocentric.subpoint()

            results.append({
                "name": sat["name"],
                "norad_id": sat["norad_id"],
                "latitude": subpoint.latitude.degrees,
                "longitude": subpoint.longitude.degrees,
                "altitude": subpoint.elevation.km
            })

        except Exception as e:
         print("Error in satellite:", sat.get("name"))
         print("Reason:", e)
        continue


    return results


def background_updater():
    global cached_positions, is_running

    if is_running:
        return

    is_running = True

    while True:
        print("Updating satellite positions...")
        cached_positions = calculate_all_positions()
        print(f"Updated {len(cached_positions)} satellites")
        time.sleep(30)  # update every 30 sec
