import requests
import geojson
import aiohttp
import asyncio
from geocodio import GeocodioClient

from dotenv import load_dotenv
import os

from app.backend.utility.coordinates import Point, Segment, Grid


class GeocodioRequests:
    def __init__(self) -> None:
        self.__key = self.__load_key()
        self.client = GeocodioClient(self.__key)

    def __load_key(self) -> str:
        load_dotenv()
        return os.getenv("GEOCODE_API_KEY")

    async def reverse_geocode_async(self, grid:Grid):
        url = f"https://api.geocod.io/v1.6/reverse"

        async with aiohttp.ClientSession() as session:
            for chunk in grid.chunks: # is a placeholder. TODO replace with asyncio.gather
                params = {
                    "q": f"{chunk.center.x},{chunk.center.y}",
                    "fields": "acs-economics",
                    "api_key": self.__key
                }
                async with session.get(url, params=params) as response:
                    result = await response.json()
                    if result['results']:
                        # check is for keyerror due to bad data.(value if exists else 0)
                        income_list = [result['results'][i]['fields']['acs']['economics']['Median household income']['Total']['value'] 
                                    if result['results'][i]['fields']['acs']['economics']['Median household income'].get('Total', 0) 
                                    else 0 for i in range(len(result['results']))]
                        income = sum(list(filter(lambda x: x != 0, income_list)))/len(income_list)
                        chunk.data['income'] = income
            return grid
