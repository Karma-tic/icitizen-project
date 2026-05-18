from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.citizen_model import Citizen

from app.schemas.citizen_schema import (
    CitizenCreate
)

from app.utils.dependencies import (
    verify_token
)


router = APIRouter()


@router.post("/citizens")
def create_citizen(

    citizen: CitizenCreate,

    db: Session = Depends(get_db),

    user=Depends(verify_token)
):

    existing_email = db.query(Citizen).filter(
        Citizen.email == citizen.email
    ).first()

    if existing_email:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    existing_mobile = db.query(Citizen).filter(
        Citizen.mobile_number ==
        citizen.mobile_number
    ).first()

    if existing_mobile:

        raise HTTPException(
            status_code=400,
            detail="Mobile number already exists"
        )

    new_citizen = Citizen(

        first_name=citizen.first_name,

        middle_name=citizen.middle_name,

        last_name=citizen.last_name,

        gender=citizen.gender,

        dob=citizen.dob,

        age=citizen.age,

        email=citizen.email,

        mobile_number=
            citizen.mobile_number,

        city=citizen.city,

        state=citizen.state,

        country=citizen.country
    )

    db.add(new_citizen)

    db.commit()

    db.refresh(new_citizen)

    return {
        "message":
            "Citizen added successfully"
    }


@router.get("/citizens")
def get_citizens(

    db: Session = Depends(get_db),

    user=Depends(verify_token)
):

    citizens = db.query(Citizen).all()

    return citizens


@router.delete("/citizens/{citizen_id}")
def delete_citizen(

    citizen_id: int,

    db: Session = Depends(get_db),

    user=Depends(verify_token)
):

    citizen = db.query(Citizen).filter(
        Citizen.id == citizen_id
    ).first()

    if not citizen:

        raise HTTPException(
            status_code=404,
            detail="Citizen not found"
        )

    db.delete(citizen)

    db.commit()

    return {
        "message":
            "Citizen deleted successfully"
    }


@router.put("/citizens/{citizen_id}")
def update_citizen(

    citizen_id: int,

    updated_data: CitizenCreate,

    db: Session = Depends(get_db),

    user=Depends(verify_token)
):

    citizen = db.query(Citizen).filter(
        Citizen.id == citizen_id
    ).first()

    if not citizen:

        raise HTTPException(
            status_code=404,
            detail="Citizen not found"
        )

    citizen.first_name =      updated_data.first_name

    citizen.middle_name =      updated_data.middle_name

    citizen.last_name =     updated_data.last_name

    citizen.gender =       updated_data.gender

    citizen.dob =       updated_data.dob

    citizen.age =        updated_data.age

    citizen.email =        updated_data.email

    citizen.mobile_number =       updated_data.mobile_number

    citizen.city =      updated_data.city

    citizen.state =  updated_data.state

    citizen.country = updated_data.country

    db.commit()

    return {
        "message":
            "Citizen updated successfully"
    }