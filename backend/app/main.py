from fastapi import FastAPI
from app.database import engine, Base

from app.models import user_model
from app.routes.auth_routes import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.citizen_routes import (
    router as citizen_router
)
from app.models import citizen_model

app = FastAPI()
app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)
app.include_router(auth_router)

app.include_router(citizen_router)
@app.on_event("startup")
def startup():
    try:
        Base.metadata.create_all(bind=engine)
        print("Database connected successfully")
    except Exception as e:
        print("Database connection failed")
        print(e)


@app.get("/")
def home():
    return {"message": "iCitizen Backend Running"}