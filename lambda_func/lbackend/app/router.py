from lbackend.app.db.mongo_db import Mongo
from fastapi import APIRouter, HTTPException


router = APIRouter()

@router.get("/")
async def ping():
    return {"Success": True}

@router.get("/db/")
async def ping_db():
    mongo_client = Mongo()
    return await mongo_client.test()

@router.get("/db/get_data_from_bounds=l:{l},b:{b},r:{r},t:{t},page:{page}")
async def get_data_from_bounds(l: float, b: float, r: float, t: float, page: int):
    """
    Retrieve map data within the specified bounds.

    Arguments:
    - l (float): The left boundary value.
    - b (float): The bottom boundary value.
    - r (float): The right boundary value.
    - t (float): The top boundary value.
    - page (int): page number.

    Returns:
    - json: A json containing the result of the query.

    Raises:
    - HTTPException(400): If the bounds are invalid.
    """
    mongo_client = Mongo()
    bounds = (l, b, r, t)
    if (len(bounds) != 4 or
        bounds[2] - bounds[0] < 0 or 
        bounds[3] - bounds[1] < 0
        ):
        raise HTTPException(status_code=400, detail="Invalid bounds")
    res = await mongo_client.get_in_bounds(bounds, page)
    if res == -1:
        return []
    return res
