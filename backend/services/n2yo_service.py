import requests
from backend.config import N2YO_BASE_URL, N2YO_API_KEY

def get_live_position(norad_id, lat, lng):
    url = (
        f"{N2YO_BASE_URL}/positions/"
        f"{norad_id}/{lat}/{lng}/0/1/&apiKey={N2YO_API_KEY}"
    )
    return requests.get(url).json()
