import numpy as np
from asyncio import run, create_task, gather

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo import ASCENDING

from dotenv import load_dotenv
import os

from app.backend.utility.coordinates import Point, Segment, Grid, create_grid
from app.backend.app.map_request_former import load_from_geocode, load_from_worldpop, load_from_model

class Mongo:
    def __init__(self) -> None:
        self.__uri = self.__load_uri()
        self.client = MongoClient(self.__uri, server_api=ServerApi('1'))
        self.mapdb = self.client.map['map']

    def __load_uri(self) -> str:
        load_dotenv()
        return f"mongodb+srv://admin:{os.getenv('MONGODB_URI_PSW')}@srmapcluster.fb8xt9p.mongodb.net/?retryWrites=true&w=majority"
    
    async def __post_object(self, item, db:list):
        existing_doc = next((i for i in db if i['cords']['vert'] == item['cords']['vert']), None)
        if existing_doc is None:
            return item
        elif (existing_doc['data']['pop_count_adj'] == -1
                or existing_doc['data']['income'] == -1
                or existing_doc['data']['crime_level'] == -1
                ):
            update_query = {
                '$set': {
                    'data.pop_count_adj': existing_doc['data']['pop_count_adj'] if existing_doc['data']['pop_count_adj'] == -1 else item['data']['pop_count_adj'],
                    'data.income': existing_doc['data']['income'] if existing_doc['data']['income'] == -1 else item['data']['income'],
                    'data.crime_level': existing_doc['data']['crime_level'] if existing_doc['data']['crime_level'] == -1 else item['data']['crime_level']
                }
            }
            self.mapdb.update_one({'id': existing_doc['id']}, update_query)

    async def post_grid(self, grid:Grid):
        data = await grid.to_json()
        # self.mapdb.create_index([('cords.center', ASCENDING)], name='cent_indx')
        tasks = []
        document = self.mapdb.find({})
        for item in data:
            tasks.append(create_task(self.__post_object(item, document)))
        res = await gather(*tasks)
        self.mapdb.insert_many(res)
        # self.mapdb.drop_index('cent_indx')
    
    # def get_2d_map_data(self):
    #     map_data = self.mapdb.find({})
    #     return map_data
    
    async def get_in_bounds(self, bounds:tuple):
        """
        Filters the map_data based on the provided bounds and returns a new dictionary.

        Arguments:
        bounds (tuple): A tuple with values (left, bottom, right, top).
        map_data (list): A list of dictionaries containing map data.

        Returns:
        dict: A new dictionary with filtered coordinates, data sorted by place and resolution in meeters.
        """

        map_data = self.mapdb.find({})
        res = []

        for item in map_data:
            cords = item['cords']
            center_lon = cords['center']['lon']
            center_lat = cords['center']['lat']
            
            if bounds[0] <= center_lon <= bounds[2] and bounds[1] <= center_lat <= bounds[3]:
                center = {
                    'lon': center_lon,
                    'lat': center_lat
                }
                
                res.append({
                    'center': center,
                    'data': item['data']['crime_level'],
                    'resolution': item['resolution']
                })
        return res
    
    async def test(self):
        try:
            self.client.admin.command('ping')
            return "MongoDB connection succsesful!"
        except Exception as e:
            return e

if __name__ == "__main__":
    m = Mongo()
    m.test()
    m.mapdb.delete_many({})

    grid = create_grid(Segment([Point(-77.2, 39.1), Point(-76.8, 38.7), Point(-76.8, 39.1), Point(-77.2, 38.7)]), 1000)
    print(len(grid.chunks))
    run(load_from_geocode(grid))
    run(load_from_worldpop(grid))
    print("Loading succsesful!")

    grid.remove_missing_values()
    grid.normalize_data()
    print("Normalization succsesful!")

    run(load_from_model(grid))


    run(m.post_grid(grid))
    print("Succsesfuly posted data!")