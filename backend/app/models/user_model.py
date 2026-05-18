from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Date
from sqlalchemy import Boolean
from sqlalchemy import DateTime

from datetime import datetime

from app.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True)

    first_name = Column(String)

    middle_name = Column(String)

    last_name = Column(String)

    gender = Column(String)

    dob = Column(Date)

    email = Column(String, unique=True)

    mobile_number = Column(
        String,
        unique=True
    )

    password_hash = Column(String)

    is_verified = Column(
        Boolean,
        default=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )