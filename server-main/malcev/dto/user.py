from pydantic import BaseModel

class User(BaseModel):
    login:str
    password:str
    role:str

class UserLogin(BaseModel):
    login:str
    password:str
