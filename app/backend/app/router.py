from app.backend.app.db.mongo_db import Mongo
from app.backend.utility.bounds import Bounds

from fastapi import APIRouter


router = APIRouter()
mongo_client = None

@router.on_event("startup")
async def startup_event():
    global mongo_client
    mongo_client = Mongo()
    await mongo_client.test()

@router.get("/ping")
async def ping():
    return {"Success": True}

@router.get("/db/{bounds}")
async def get_item(bounds: Bounds):
    return await mongo_client.get_in_bounds(bounds.bounds)
