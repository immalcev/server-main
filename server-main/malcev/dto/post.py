from pydantic import BaseModel
from datetime import date
class Post(BaseModel):
    title:str
    body:str
    created_at:date
    user_id:int