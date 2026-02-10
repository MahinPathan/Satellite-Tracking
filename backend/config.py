import os
from dotenv import load_dotenv
from pathlib import Path

# backend/.env ka exact path
BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_PATH)

N2YO_API_KEY = os.getenv("N2YO_API_KEY")

CELESTRAK_URL = "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle"
N2YO_BASE_URL = "https://api.n2yo.com/rest/v1/satellite"

if not N2YO_API_KEY:
    raise RuntimeError("N2YO API KEY NOT FOUND")
