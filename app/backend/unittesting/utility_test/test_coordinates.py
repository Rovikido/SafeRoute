import pytest
import geojson

from backend.utility.coordinates import Point, Segment, Grid

def test_point_get():
    # Test the get method of the Point class
    p = Point(1.0, 2.0)
    assert p.get() == (1.0, 2.0)


def test_point_str():
    # Test the __str__ method of the Point class
    p = Point(1.0, 2.0)
    assert str(p) == "Point x:1.0 y:2.0"


def test_segment_init():
    # Test the initialization of the Segment class with a correct number of points
    points = [Point(1.0, 2.0), Point(3.0, 4.0), Point(5.0, 6.0), Point(7.0, 8.0)]
    s = Segment(points)
    assert s.points == points


def test_segment_get():
    # Test the get method of the Segment class
    points = [Point(1.0, 2.0), Point(3.0, 4.0), Point(5.0, 6.0), Point(7.0, 8.0)]
    s = Segment(points)
    assert s.get() == points


def test_segment_get_raw():
    # Test the get_raw method of the Segment class
    points = [Point(1.0, 2.0), Point(3.0, 4.0), Point(5.0, 6.0), Point(7.0, 8.0)]
    s = Segment(points)
    assert s.get_raw() == [(1.0, 2.0), (3.0, 4.0), (5.0, 6.0), (7.0, 8.0)]


def test_segment_get_polygon():
    # Test the get_polygon method of the Segment class
    points = [Point(1.0, 2.0), Point(3.0, 4.0), Point(5.0, 6.0), Point(7.0, 8.0)]
    s = Segment(points)
    polygon = geojson.Polygon([(1.0, 2.0), (3.0, 4.0), (5.0, 6.0), (7.0, 8.0)])
    assert s.get_polygon() == polygon


def test_segment_get_feature():
    # Test the get_feature method of the Segment class
    points = [Point(1.0, 2.0), Point(3.0, 4.0), Point(5.0, 6.0), Point(7.0, 8.0)]
    s = Segment(points)
    polygon = geojson.Polygon([(1.0, 2.0), (3.0, 4.0), (5.0, 6.0), (7.0, 8.0),])
    feature = geojson.Feature(geometry=polygon)
    assert s.get_feature() == feature


@pytest.fixture
def sample_segment():
    return Segment([
        Point(1.0, 2.0),
        Point(3.0, 4.0),
        Point(5.0, 6.0),
        Point(7.0, 8.0)
    ])

def test_grid_initialization(sample_segment):
    grid = Grid(sample_segment)
    assert len(grid.points) == 4

def test_split_by_res(sample_segment):
    grid = Grid(sample_segment)
    chunks = grid.split_by_res(3.0)
    assert len(chunks) == 4
    assert isinstance(chunks[0], Segment)
    assert all(len(chunk.points) == 4 for chunk in chunks)
    assert all(isinstance(pnt, Point) for chunk in chunks for pnt in chunk.points)