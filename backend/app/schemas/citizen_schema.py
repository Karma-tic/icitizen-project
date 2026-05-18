from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import field_validator

from datetime import date


class CitizenCreate(BaseModel):

    first_name: str

    middle_name: str | None = None

    last_name: str

    gender: str

    dob: date

    age: int

    email: EmailStr

    mobile_number: str

    city: str

    state: str

    country: str

    @field_validator("mobile_number")
    @classmethod
    def validate_mobile(cls, value):

        if not value.isdigit():

            raise ValueError(
                "Mobile must contain digits only"
            )

        if len(value) != 10:

            raise ValueError(
                "Mobile number must be 10 digits"
            )

        return value