from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.schemas.user_schema import UserSignup
from app.schemas.login_schema import LoginSchema

from app.models.user_model import User

from app.utils.security import hash_password
from app.utils.security import verify_password
from app.utils.auth import create_access_token

router = APIRouter()


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/signup")
def signup(
    user: UserSignup,
    db: Session = Depends(get_db)
):

    existing_email = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_email:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    existing_mobile = db.query(User).filter(
        User.mobile_number == user.mobile_number
    ).first()

    if existing_mobile:

        raise HTTPException(
            status_code=400,
            detail="Mobile already registered"
        )

    hashed_password = hash_password(
        user.password
    )

    new_user = User(

        first_name=user.first_name,

        middle_name=user.middle_name,

        last_name=user.last_name,

        gender=user.gender,

        dob=user.dob,

        email=user.email,

        mobile_number=user.mobile_number,

        password_hash=hashed_password
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "Signup successful"
    }


@router.post("/login")
def login(
    user: LoginSchema,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(

        (User.email == user.login_input)

        |

        (User.mobile_number == user.login_input)

    ).first()

    if not existing_user:

        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    password_valid = verify_password(
        user.password,
        existing_user.password_hash
    )

    if not password_valid:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return {
        "message":
            "Login successful"
    }