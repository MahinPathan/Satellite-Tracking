from fastapi import FastAPI
from routes.satellite_routes import router

app = FastAPI(title="Satellite Tracking System")

app.include_router(router)
