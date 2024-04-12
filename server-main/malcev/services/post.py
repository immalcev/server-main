from fastapi import Depends, HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from models.post import Post as Events
from models.user import User
from dto.post import Post as EventDto
from dto.user import User as UserDto
def create_post(data: EventDto ,db: Session):
    event = Events(title=data.title,body=data.body,created_at=data.created_at,user_id=data.user_id)
    try:
        db.add(event)
        db.commit()
        db.refresh(event)
    except Exception as e:
        print(e)
    return event


def get_posts(db: Session):
    return  db.query(Events).all()


def get_post(id: int, db: Session):
    return db.query(Events).filter(Events.id == id).first()

def delete_post(id: int, db: Session):
    event = db.query(Events).filter(Events.id == id).delete()
    db.commit()
    return event

