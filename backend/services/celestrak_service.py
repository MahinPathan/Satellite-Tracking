import requests
import json
from pathlib import Path
from backend.config import CELESTRAK_URL

# backend/ ka path
BASE_DIR = Path(__file__).resolve().parent.parent

DATA_DIR = BASE_DIR / "data"
TLE_FILE = DATA_DIR / "tle_raw.txt"
JSON_FILE = DATA_DIR / "satellites.json"


def update_satellites():
    # ensure data folder exists
    DATA_DIR.mkdir(exist_ok=True)

    # fetch TLE data
    response = requests.get(CELESTRAK_URL, timeout=30)
    response.raise_for_status()

    # save raw TLE
    TLE_FILE.write_text(response.text, encoding="utf-8")

    lines = response.text.splitlines()
    satellites = []

    for i in range(0, len(lines), 3):
        try:
            name = lines[i].strip()
            line1 = lines[i + 1].strip()
            line2 = lines[i + 2].strip()

            norad_id = int(line1[2:7])

            satellites.append({
                "name": name,
                "norad_id": norad_id,
                "tle": {
                    "line1": line1,
                    "line2": line2
                }
            })
        except Exception:
            continue

    # save processed satellites
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(satellites, f, indent=2)

    return len(satellites)
