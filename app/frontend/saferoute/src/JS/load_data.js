import chroma from 'chroma-js';
const { hexToRgb } = require("@mui/material");

export async function fetchData(l, b, r, t) {
  try {
    const response = await fetch(`https://oexjdd5nwohwxdgrrbfosq6bie0zwiky.lambda-url.eu-central-1.on.aws/db/get_data_from_bounds=l:${l},b:${b},r:${r},t:${t}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
}

function getMinMaxValues(data) {
  let minValue = Number.MAX_VALUE;
  let maxValue = Number.MIN_VALUE;

  for (let entry of data) {
    if (entry.data < minValue) {
      minValue = entry.data;
    }
    if (entry.data > maxValue) {
      maxValue = entry.data;
    }
  }

  return { min: minValue, max: maxValue };
}


function calculateFillColor(value, minValue, maxValue) {
  const colorScale = chroma.scale(['green', 'yellow', 'red']).domain([minValue, maxValue]);
  return colorScale(value).hex();
}

export async function to_heatmap_data(l, b, r, t, opc = 0.3) {
  const data = await fetchData(l, b, r, t);
  console.log('Fetched data:', data);

  // Calculate the minimum and maximum values from the data array
  const { min, max } = getMinMaxValues(data);

  const heatmaps = [];

  for (let entry of data) {
    let squareSize = entry.resolution;
    const squareBounds = [
      { lat: entry.center.lat + squareSize / 2, lng: entry.center.lon + squareSize / 2 },
      { lat: entry.center.lat + squareSize / 2, lng: entry.center.lon - squareSize / 2 },
      { lat: entry.center.lat - squareSize / 2, lng: entry.center.lon - squareSize / 2 },
      { lat: entry.center.lat - squareSize / 2, lng: entry.center.lon + squareSize / 2 },
    ];

    const squareOptions = {
      paths: squareBounds,
      options: {
        fillColor: calculateFillColor(entry.data, min, max),
        fillOpacity: opc,
        strokeColor: calculateFillColor(entry.data, min, max),
        strokeOpacity: opc - 0.2,
        strokeWeight: 0,
        clickable: false,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 1
      },
    };

    heatmaps.push(squareOptions);
  }

  console.log(heatmaps);
  return heatmaps;
}