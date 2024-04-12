from sqlalchemy import Column,Integer,String,Boolean,DateTime,ForeignKey,JSON
from db import Base

class Events(Base):
    __tablename__ = 'events'
    id = Column(Integer,primary_key=True,autoincrement=True,index=True)
    name = Column(String,nullable=False,index=True)
    description = Column(String,nullable=False)
    img = Column(String,nullable=False)
    date = Column(DateTime(timezone=True))
    status = Column(Boolean,nullable=False)
    location = Column(String,nullable=False)
    members = Column(JSON,nullable=True)