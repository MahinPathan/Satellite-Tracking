import requests, json
from config import CELESTRAK_URL

def fetch_and_parse_tle():
    text = requests.get(CELESTRAK_URL).text
    lines = text.splitlines()

    satellites = []

    for i in range(0, len(lines), 3):
        try:
            name = lines[i].strip()
            l1 = lines[i+1].strip()
            l2 = lines[i+2].strip()
            norad_id = int(l1[2:7])

            satellites.append({
                "name": name,
                "norad_id": norad_id,
                "tle": {
                    "line1": l1,
                    "line2": l2
                }
            })
        except:
            continue

    with open("data/satellites.json", "w") as f:
        json.dump(satellites, f, indent=2)

    return len(satellites)
