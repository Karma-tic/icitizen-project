from sqlalchemy import Column, Integer, String, Boolean, DateTime
from app.database import Base
from datetime import datetime


class User(Base):
    __tablename__ = "LoginMaster"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    middle_name = Column(String(100), nullable=True)
    last_name = Column(String(100), nullable=False)

    gender = Column(String(20), nullable=False)

    email = Column(String(150), unique=True, nullable=False)
    mobile_number = Column(String(10), unique=True, nullable=False)

    password_hash = Column(String(500), nullable=False)

    is_verified = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)