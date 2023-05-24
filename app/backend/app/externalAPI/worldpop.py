import requests
import geojson

from app.backend.utility.coordinates import Point, Segment, Grid, create_grid

# Define the area of interest as a bounding box
class WorldPopRequests:
    def __init__(self, key=None) -> None:
        if key is not None:
            self.api_key = key

    def form_geojson(self, grid:Grid):
        fc = geojson.FeatureCollection([chunk.get_feature() for chunk in grid.chunks])
        gjson = geojson.dumps(fc, sort_keys=True)
        # add here maker for featurecollection
        return gjson

    def get_data(self):
        pass
        
def load_from_file():
    pass #TODO: 

