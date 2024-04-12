from fastapi import FastAPI
from db import Session, engine, Base
from routes import events as event_routes
from routes import user as user_routes
from routes import post as post_routes
from fastapi.middleware.cors import CORSMiddleware
Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = [
"http://localhost:3000", # Assuming your frontend runs on localhost:3000
]


app.add_middleware(
CORSMiddleware,
allow_origins=["http://localhost:3000"],
allow_credentials=True,
allow_methods=["GET", "POST", "PUT", "DELETE"],
allow_headers=["*"],
)

app.include_router(user_routes.router, prefix="/api")
app.include_router(post_routes.router, prefix='/api')
