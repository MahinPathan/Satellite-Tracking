from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.satellite_routes import router
from backend.services.orbit_service import background_updater
import threading

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.on_event("startup")
def start_background():
    thread = threading.Thread(target=background_updater)
    thread.daemon = True
    thread.start()
