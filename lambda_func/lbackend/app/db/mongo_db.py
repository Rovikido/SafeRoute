from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from dotenv import load_dotenv
import os

class Mongo:
    def __init__(self) -> None:
        self.__uri = self.__load_uri()
        self.client = MongoClient(self.__uri, server_api=ServerApi('1'))
        self.mapdb = self.client.map['map']
        self.page_size = 1000

    def __load_uri(self) -> str:
        load_dotenv()
        return f"mongodb+srv://admin:{os.getenv('MONGODB_URI_PSW')}@srmapcluster.fb8xt9p.mongodb.net/?retryWrites=true&w=majority"
    
    async def get_in_bounds(self, bounds:tuple, page:int):
        """
        Filters the map_data based on the provided bounds and returns a new dictionary, consisting of 1000 enteries.

        Arguments:
        bounds (tuple): A tuple with values (left, bottom, right, top).
        map_data (list): A list of dictionaries containing map data.
        page (int): which segment of data to return.

        Returns:
        dict: A new dictionary with filtered coordinates, data sorted by place and resolution in meeters.
        -1: if page number is invalid
        """

        md= list(self.mapdb.find({}))
        if len(md) < self.page_size * page:
            return -1
        if len(md) < self.page_size * (page + 1):
            map_data = md[self.page_size * page:]
        else:
            map_data = md[self.page_size * page:self.page_size * (page+1)]
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