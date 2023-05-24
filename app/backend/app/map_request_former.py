import requests
import geojson
import aiohttp
import asyncio
import tensorflow as tf
from pandas import DataFrame

from app.backend.utility.coordinates import Grid
from app.backend.app.externalAPI.geocode import GeocodioRequests

#координати -> перевірка чи кешовано -> якшо ні, то створити грід -> заповнити його через worldpop і geocode -> кинути  цей грід в map_response

async def load_from_geocode(grid:Grid) -> bool:
    gr = GeocodioRequests()
    await gr.reverse_geocode_async(grid)
    return True

async def load_from_worldpop(grid:Grid) -> bool:
    
    return True
