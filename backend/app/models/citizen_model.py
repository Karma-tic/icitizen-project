from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Date
from sqlalchemy import DateTime

from datetime import datetime

from app.database import Base


class Citizen(Base):

    __tablename__ = "citizens"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    first_name = Column(
        String(100),
        nullable=False
    )

    middle_name = Column(
        String(100),
        nullable=True
    )

    last_name = Column(
        String(100),
        nullable=False
    )

    gender = Column(
        String(20),
        nullable=False
    )

    dob = Column(
        Date,
        nullable=False
    )

    age = Column(
        Integer,
        nullable=False
    )

    email = Column(
        String(150),
        unique=True,
        nullable=False
    )

    mobile_number = Column(
        String(10),
        unique=True,
        nullable=False
    )

    city = Column(
        String(100),
        nullable=False
    )

    state = Column(
        String(100),
        nullable=False
    )

    country = Column(
        String(100),
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )