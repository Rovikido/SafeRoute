from pydantic import BaseModel, validator, Tuple

class Bounds(BaseModel):
    bounds: Tuple[float, float, float, float]

    @validator('bounds')
    def validate_bounds(cls, bounds):
        if len(bounds) != 4 or bounds[2] - bounds[0] < 0 or bounds[3] - bounds[1] < 0:
            raise ValueError("Invalid bounds")
        return bounds