import React from 'react';
import { GoogleMap, LoadScript, useJsApiLoader, Polygon, HeatmapLayer } from '@react-google-maps/api';
import { mapContainerStyle, defaultOptions, defaultCenter, bounds } from './JS/map_setup';
import { to_heatmap_data } from './JS/load_data';
import { withAuthenticator } from '@aws-amplify/ui-react';
import ReactLoading from 'react-loading';
import css from './css/style.css';
import signoutImage from './images/signout.png';

const API_KEY = process.env.REACT_APP_API_KEY;

const MapComponent = () => {
  const [map, setMap] = React.useState(null);
  const [heatmaps, setHeatmaps] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onLoad = React.useCallback(function callback(mapInstance) {
    setMap(mapInstance);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true before fetching data
      const heatmapData = await to_heatmap_data(bounds.west, bounds.south, bounds.east, bounds.north);
      setHeatmaps(heatmapData);
      setIsLoading(false); // Set loading state to false after fetching data
    };
    fetchData();
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={defaultCenter}
      zoom={12}
      options={defaultOptions}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Add Polygon components for each square */}
      {heatmaps.map((squareOptions, index) => (
        <Polygon key={index} {...squareOptions} />
      ))}
      {/* Add any additional components, like markers, here */}
      {/* <Marker position={defaultCenter} /> */}

      {/* Render the loading screen */}
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: -80,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <ReactLoading type="spinningBubbles" color="#eff1f5" height={80} width={80} />
        </div>
      )}
    </GoogleMap>
  );
};



const Map = ({ signOut, user }) => {
  const isLoaded = !!API_KEY;
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li style={{ textAlign: 'left', float: 'left' }}>
              <a href="/map">SAFEROUTE</a>
            </li>
            <li className="navHover" style={{ textAlign: 'right' }}>
              <a href="/map">Map</a>
            </li>
            <li className="navHover" style={{ textAlign: 'right' }}>
              <a className="navHover" href="/about">About</a>
            </li>
            <li className="navHover" style={{ textAlign: 'right' }}>
              <a href="/used_data">Used data</a>
            </li>
            <li className="navHover" style={{ textAlign: 'right' }}><img
                className="navHover"
                src={signoutImage}
                alt="Signout"
                onClick={signOut} 
                style={{ textAlign: 'right', cursor: 'pointer', width: '20px', height: '20px', transform: 'translateY(20%)'}}
                />
            </li>
          </ul>
        </nav>
      </header>
      {isLoaded ? (
        <LoadScript googleMapsApiKey={API_KEY} language="en"  libraries={['visualization']}>
          <MapComponent />
        </LoadScript>
      ) : (
        <h2>LOADING MAP</h2>
      )}
    </div>
  );
};

export default withAuthenticator(Map, {
  socialProviders: ['google']
});
