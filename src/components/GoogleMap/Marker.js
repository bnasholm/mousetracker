import React from 'react';
import { Marker as GoogleMarker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import { useRef } from 'react';

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
const redIcon = null; //require('Images/MapIcons/markerIconRed.png');
const blueIcon = null; //require('Images/MapIcons/markerIconBlue.png');
const greenIcon = null; //require('Images/MapIcons/markerIconGreen.png');

const Marker = ({
  displayedMarker,
  marker,
  displayMarker,
  onDisplayedMarkerClick,
  onLoad,
  classes
}) => {
  if (!marker) return <></>;

  // displayed checks marker to see if the one we are displaying is the one that user
  // wants to display info window on
  const displayed = displayedMarker && marker.eventId === displayedMarker.eventId;
  const markerRef = null;//useRef(null);

  const { arrival, latitude, longitude, description } = marker;

  const position = {
    lat: latitude,
    lng: longitude
  };

  const renderInfoWindow = () => {
    if (displayMarker)
      return (
        <InfoWindow anchor={displayMarker}>
          <div className={classes.infoWindow}>{description}</div>
        </InfoWindow>
      );
  };


  // handles click on marker itself to show info window and center map on marker
  const onClick = () => {
    onDisplayedMarkerClick(markerRef.current.marker, marker);
  };

  return (
    <div className={classes.marker}>
      {/* null refers to device location */
      arrival === null && (
        <GoogleMarker onLoad={onLoad} ref={markerRef} onClick={onClick} position={position} icon={blueIcon} />
      )}
      {/* true refers to geofence entry */
      arrival === true && (
        <GoogleMarker onLoad={onLoad} ref={markerRef} onClick={onClick} position={position} icon={greenIcon} />
      )}
      {/* false refers to geofence exit */
      arrival === false && (
        <GoogleMarker onLoad={onLoad} ref={markerRef} onClick={onClick} position={position} icon={redIcon} />
      )}
      {displayed && renderInfoWindow()}
    </div>
  );
};

export default Marker;