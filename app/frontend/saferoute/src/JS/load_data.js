const { hexToRgb } = require("@mui/material");

export async function fetchData(l, b, r, t) {
  try {
    const response = await fetch(`https://gbwulhh6jwf2brpn5iwedaj67m0uvyuo.lambda-url.eu-central-1.on.aws/db/get_data_from_bounds=l:${l},b:${b},r:${r},t:${t}`);
    const res = JSON.parse(response);
    console.log(`https://gbwulhh6jwf2brpn5iwedaj67m0uvyuo.lambda-url.eu-central-1.on.aws/db/get_data_from_bounds=l:${l},b:${b},r:${r},t:${t}`);
    console.log(res);
    return res;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
}

export async function to_heatmap_data(l, b, r, t, opc = 0.6) {
  const data = await fetchData(l, b, r, t);

  const heatmapDataByResolution = {};

  for (let entry of data) {
    if (!heatmapDataByResolution.hasOwnProperty(entry.resolution)) {
      heatmapDataByResolution[entry.resolution] = { positions: [] };
    }

    heatmapDataByResolution[entry.resolution].positions.push({
      lat: entry.center.lat,
      lng: entry.center.lon,
    });
  }

  const heatmaps = [];

  Object.entries(heatmapDataByResolution).forEach(([key, value]) => {
    const res = {
      positions: [],
      options: {
        radius: (parseInt(key) / 1000) * 20,
        opacity: opc,
        dissipating: false
      },
    };

    for (let pos of value.positions) {
      res.positions.push(pos);
    }

    heatmaps.push(res);
  });

  return heatmaps;
}
