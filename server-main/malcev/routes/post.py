from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session

from db import getdb
from dto.post import Post as PostDTO
from services import post

router = APIRouter()

@router.get("/post", tags=['posts'])
async def get_events(db: Session = Depends(getdb)):
    return post.get_posts(db)

@router.get("/post/{id}", tags=['posts'])
async def get_event(id: int, db: Session =Depends(getdb)):
    return post.get_post(id,db)

@router.post("/post", tags=['posts'])
async def create_event(data: PostDTO, db: Session = Depends(getdb)):
    return post.create_post(data,db)

@router.delete("/post/{id}", tags=['posts'])
async def delete_event(id: int, db: Session = Depends(getdb)):
    return post.delete_post(id,db)