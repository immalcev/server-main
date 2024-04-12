from pydantic import BaseModel
from datetime import date
class Event(BaseModel):
    name: str
    description:str
    img:str
    date:date
    status:bool
    location:str
    members: list