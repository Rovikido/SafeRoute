from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from dotenv import load_dotenv
import os

from app.backend.utility.coordinates import Point, Segment, Grid, create_grid

class Mongo:
    def __init__(self) -> None:
        self.__uri = self.__load_uri()
        self.client = MongoClient(self.__uri, server_api=ServerApi('1'))
        self.mapdb = self.client.map.map

    def __load_uri(self) -> str:
        load_dotenv()
        return f"mongodb+srv://admin:{os.getenv('MONGODB_URI_PSW')}@srmapcluster.fb8xt9p.mongodb.net/?retryWrites=true&w=majority"
    
    async def post_grid(self, grid:Grid):
        data = await grid.to_json()
        for item in data:
            query = {'cords': {'vert': item['cords']['vert']}}
            existing_doc = await self.mapdb.find_one(query)
            
            if existing_doc is None:
                await self.mapdb.insert_one(item)
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
                await self.mapdb.update_one({'id': existing_doc['id']}, update_query)

    def test(self):
        try:
            self.client.admin.command('ping')
            print("MongoDB connection succsesful!")
        except Exception as e:
            print(e)

m = Mongo()
# m.test()
print(m.client.list_database_names())
print((m.client.map).list_collection_names())