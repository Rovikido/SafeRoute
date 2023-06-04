import pytest

from app.backend.utility.coordinates import Segment, Grid, Point, create_grid


@pytest.fixture
def sample_segment():
    points = [
        Point(0, 0),
        Point(1, 0),
        Point(1, 1),
        Point(0, 1)
    ]
    return Segment(points=points)


@pytest.fixture
def sample_grid(sample_segment):
    return create_grid(sample_segment, 100)


def test_remove_missing_values(sample_grid):
    # Test removing missing values
    # Set some data values to -1
    sample_grid.chunks[0].data['pop_count_adj'] = -1
    sample_grid.chunks[1].data['income'] = -1

    # Call the function to remove missing values
    sample_grid.remove_missing_values()

    # Check if the missing values have been replaced
    assert sample_grid.chunks[0].data['pop_count_adj'] != -1
    assert sample_grid.chunks[1].data['income'] != -1


def test_normalize_data(sample_grid):
    # Set some sample data values
    sample_grid.chunks[0].data['pop_count_adj'] = 100
    sample_grid.chunks[1].data['income'] = 500

    # Call the function to normalize data
    sample_grid.normalize_data()

    # Check if the data values have been normalized
    assert sample_grid.chunks[0].data['pop_count_adj'] == 0
    assert sample_grid.chunks[1].data['income'] == 0.5
