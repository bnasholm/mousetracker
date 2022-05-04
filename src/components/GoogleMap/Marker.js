import React from 'react';
import { Marker as GoogleMarker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import { useRef } from 'react';
import markers from "./DisneyMarkers";

const styles = theme => ({
  marker: {
    display: 'flex',
    alignItems: 'center',
    width: '180px'
  },
  infoWindow: {
    padding: '22px',
    fontWeight: '600'
  }
});
// const redIcon = null; //require('Images/MapIcons/markerIconRed.png');
// const blueIcon = null; //require('Images/MapIcons/markerIconBlue.png');
const blueIcon  = require('./map-icons/markerIconBlue.png');

const Marker = ({
  marker,
  displayMarker,
  onLoad
}) => {
  if (!marker) return <></>;

  const { latitude, longitude, rideName } = marker;
  const displayed = displayMarker && marker === markers[displayMarker];

  const position = {
    lat: latitude,
    lng: longitude
  };

  const renderInfoWindow = () => {
    console.log(displayMarker);
    if (displayMarker)
      return (
        <InfoWindow anchor={displayMarker}>
          <div className="infoWindow">{rideName}</div>
        </InfoWindow>
      );
  };


  return (
    <div>
      <GoogleMarker position={position} icon={blueIcon} />
      {renderInfoWindow()}
    </div>
  );
};

export default Marker;