from fastapi import FastAPI
from app.database import engine, Base

from app.models import user_model

app = FastAPI()


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