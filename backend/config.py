import os
from dotenv import load_dotenv

load_dotenv()

N2YO_API_KEY = os.getenv("N2YO_API_KEY")

CELESTRAK_URL = (
    "https://celestrak.org/NORAD/elements/"
    "gp.php?GROUP=active&FORMAT=tle"
)

N2YO_BASE_URL = "https://api.n2yo.com/rest/v1/satellite"
