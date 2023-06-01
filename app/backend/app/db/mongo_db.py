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
    
    def get_2d_map(self):
        map_data = self.mapdb.find({})
        return map_data
    
    def test(self):
        try:
            self.client.admin.command('ping')
            print("MongoDB connection succsesful!")
        except Exception as e:
            print(e)

if __name__ == "__main__":
    m = Mongo()
    m.test()
    # m.mapdb.delete_many({})

    grid = create_grid(Segment([Point(-77.08, 39.0), Point(-76.9, 38.8), Point(-76.9, 39.0), Point(-77.08, 38.8)]), 1000)
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