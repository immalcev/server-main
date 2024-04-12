from fastapi import Depends, HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from models.events import Events
from models.user import User
from dto.events import Event as EventDto
from dto.user import User as UserDto


def create_event(data: EventDto, db: Session):
    event = Events(name=data.name, description=data.description, img=data.img, date=data.date, location=data.location,
                   status=data.status, members=data.members)
    try:
        db.add(event)
        db.commit()
        db.refresh(event)
    except Exception as e:
        print(e)
    return event


def get_events(db: Session):
    return db.query(Events).all()


def get_event(id: int, db: Session):
    return db.query(Events).filter(Events.id == id).first()


def delete_event(id: int, db: Session):
    event = db.uery(Events).filter(Events.id == id).delete()
    db.commit()
    return event


def sign_up_for_event(user_id: int, event_id: int, db: Session):
    try:
        user = db.query(User).filter(User.id == user_id).first()
        event = db.query(Events).filter(Events.id == event_id).first()

        if user is None or event is None:
            raise HTTPException(status_code=404, detail="User or event not found")

        if event.members is None:
            event.members = [user_id]
        else:
            event.members.append(user_id)

        db.commit()
        return {"message": f"User '{user.login}' successfully signed up for event '{event.name}'."}

    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="User is already signed up for this event")
