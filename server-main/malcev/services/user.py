from fastapi import Depends, Header, HTTPException
from sqlalchemy.orm import Session

from db import getdb
from models.user import User
from dto.user import User as userDTO
from datetime import datetime, timedelta
from typing import Optional
from jose import jwt, JWTError
from passlib.context import CryptContext
from utils import hash_password, verify_password
import secrets
SECRET_KEY = secrets.token_hex(16)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # or whatever fits your needs

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def authenticate_user(db: Session, login: str, password: str):
    user = db.query(User).filter(User.login == login).first()
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

def register_user(db: Session, user: userDTO):
    db_user = db.query(User).filter(User.login == user.login).first()
    if db_user:
        return None  # User already exists
    hashed_password = hash_password(user.password)
    db_user = User(login=user.login, password=hashed_password, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_token_for_user(user: User):
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.login}, expires_delta=access_token_expires
    )
    return access_token


def decode_jwt(token: str = Header(...)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = {"username": username}
    except JWTError:
        raise credentials_exception
    return token_data

def get_current_user(token: str = Depends(decode_jwt), db: Session = Depends(getdb)):
    username = token["username"]
    user = db.query(User).filter(User.login == username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
