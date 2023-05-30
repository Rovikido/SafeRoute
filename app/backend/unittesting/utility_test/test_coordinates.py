import pytest
from app.backend.utility.coordinates import Point, Segment, Grid, create_grid

@pytest.fixture
def sample_segment():
    points = [Point(0, 0), Point(0, 1), Point(1, 1), Point(1, 0)]
    return Segment(points)

def test_segment_get_center(sample_segment):
    assert sample_segment.center.x == 0.5
    assert sample_segment.center.y == 0.5

def test_segment_point_in_segment(sample_segment):
    point_inside = Point(0.5, 0.5)
    point_outside = Point(2, 2)

    assert sample_segment.point_in_segment(point_inside) is True
    assert sample_segment.point_in_segment(point_outside) is False

def test_grid_split_by_res(sample_segment):
    grid = Grid(sample_segment)
    chunks = grid.split_by_res(0.1)

    assert len(chunks) == 4

def test_grid_get_centers(sample_segment):
    grid = Grid(sample_segment)
    grid.split_by_res(0.1)
    centers = grid.get_centers()

    assert len(centers) == 4

def test_create_grid():
    seg = Segment([Point(0, 0), Point(0, 1), Point(1, 1), Point(1, 0)])
    grid = create_grid(seg, res_m=1000)
    
    assert isinstance(grid, Grid)
    assert len(grid.chunks) > 0
    assert grid.resolution == 0.001