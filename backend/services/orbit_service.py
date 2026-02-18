from skyfield.api import EarthSatellite, load
from datetime import datetime, timezone
import json
from pathlib import Path
import threading
import time
import math

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
SAT_FILE = DATA_DIR / "satellites.json"

ts = load.timescale()

cached_positions = []
is_running = False


# =====================================
# 🔥 Calculate All Satellite Positions
# =====================================
def calculate_all_positions():
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

            lat = subpoint.latitude.degrees
            lon = subpoint.longitude.degrees
            alt = subpoint.elevation.km

            # 🔥 Remove NaN values (VERY IMPORTANT)
            if math.isnan(lat) or math.isnan(lon) or math.isnan(alt):
                continue

            results.append({
                "name": sat["name"],
                "norad_id": sat["norad_id"],
                "latitude": float(lat),
                "longitude": float(lon),
                "altitude": float(alt)
            })

        except Exception:
            continue

    return results


# =====================================
# 🔥 Background Auto Updater
# =====================================
def background_updater():
    global cached_positions, is_running

    if is_running:
        return

    is_running = True

    while True:
        print("Updating satellite positions...")
        try:
            cached_positions = calculate_all_positions()
            print(f"Updated {len(cached_positions)} satellites")
        except Exception as e:
            print("Background update error:", e)

        time.sleep(30)  # update every 30 sec


# =====================================
# 🔥 Start Thread Automatically
# =====================================
def start_background_updater():
    thread = threading.Thread(target=background_updater)
    thread.daemon = True
    thread.start()
