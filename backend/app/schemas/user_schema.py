from pydantic import BaseModel, EmailStr, field_validator
from datetime import date
import re


class UserSignup(BaseModel):
    first_name: str
    middle_name: str | None = None
    last_name: str

    gender: str

    dob: date

    email: EmailStr

    mobile_number: str

    password: str
    confirm_password: str

    @field_validator("first_name", "last_name")
    @classmethod
    def validate_names(cls, value):
        if not value.strip():
            raise ValueError("Name cannot be empty")

        if not value.replace(" ", "").isalpha():
            raise ValueError(
                "Only alphabets allowed"
            )

        return value.title()

    @field_validator("gender")
    @classmethod
    def validate_gender(cls, value):
        allowed = ["Male", "Female", "Other"]

        if value not in allowed:
            raise ValueError("Invalid gender")

        return value

    @field_validator("mobile_number")
    @classmethod
    def validate_mobile(cls, value):

        if not re.fullmatch(r"^[0-9]{10}$", value):
            raise ValueError(
                "Mobile number must be exactly 10 digits"
            )

        return value

    @field_validator("password")
    @classmethod
    def validate_password(cls, value):

        if len(value) < 8:
            raise ValueError(
                "Password must be minimum 8 characters"
            )

        if not re.search(r"[A-Z]", value):
            raise ValueError(
                "Password must contain uppercase letter"
            )

        if not re.search(r"[a-z]", value):
            raise ValueError(
                "Password must contain lowercase letter"
            )

        if not re.search(r"[0-9]", value):
            raise ValueError(
                "Password must contain number"
            )

        if not re.search(r"[@$!%*?&]", value):
            raise ValueError(
                "Password must contain special character"
            )

        return value

    @field_validator("confirm_password")
    @classmethod
    def validate_confirm_password(cls, value, info):

        password = info.data.get("password")

        if value != password:
            raise ValueError(
                "Passwords do not match"
            )

        return value