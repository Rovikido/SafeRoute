import React from 'react';
import './CSS/style.css';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { style } from './JS/map_setup';

const MapComponent = () => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCtrrjLaFynd17T3RxwEwnf-HIkrxXw2yk"
      version="weekly"
    >
      <GoogleMap
        id="map"
        center={{ lat: 40.7, lng: -74 }}
        zoom={10}
        disableDefaultUI = {true}
        gestureHandling = 'greedy'
        styles = {style}
        restriction = {{
          latLngBounds: {
            north: 41.3,
            south: 40,
            east: -72,
            west: -76,
          }
        }}
      />
    </LoadScript>
  );
};

const Map = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li style={{ textAlign: 'left', float: 'left' }}>
              <a href="./map">SAFEROUTE</a>
            </li>
            <li className="navHover" style={{ textAlign: 'right' }}>
              <a href="./map">Map</a>
            </li>
            <li className="navHover" style={{ textAlign: 'right' }}>
              <a className="navHover" href="./about">About</a>
            </li>
            <li className="navHover" style={{ textAlign: 'right' }}>
              <a href="./used_data">Used data</a>
            </li>
          </ul>
        </nav>
      </header>
      <div id="map"></div>
      <MapComponent />
    </div>
  );
};

export default Map; 
