from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db import getdb
from services.user import *
from dto.user import User,UserLogin

router = APIRouter()


@router.post("/register/",tags=['users'])
def register(user: User, db: Session = Depends(getdb)):
    db_user = register_user(db=db, user=user)
    if db_user is None:
        raise HTTPException(status_code=400, detail="Email already registered")
    return {"message": "User created successfully.", "user": user.login}

@router.post("/login/",tags=['users'])
def login(form_data: UserLogin, db: Session = Depends(getdb)):  # Assuming UserLogin is a Pydantic model
    user = authenticate_user(db, form_data.login, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_token_for_user(user)
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/token/",tags=['users'])
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user