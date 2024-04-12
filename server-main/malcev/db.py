from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite3'

engine = create_engine(SQLALCHEMY_DATABASE_URI, connect_args={"check_same_thread":False})
Session = sessionmaker(autocommit=False,bind=engine,autoflush=False)
Base = declarative_base()

def getdb():
    db = Session()
    try:
        yield db
    finally:
        db.close()