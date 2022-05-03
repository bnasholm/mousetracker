import React, { useState } from 'react';
import { GoogleMap as GoogleMapReact, LoadScript, MarkerClusterer } from '@react-google-maps/api';
import Marker from './Marker';


const GoogleMap = ({ displayedMarker, markers, onDisplayedMarkerClick, latitude, longitude, zoom = 17, classes }) => {
  const mapProps = {
    center: {
      // if we have a marker to display, center the map on that, otherwise center on location
      lat: displayedMarker ? parseFloat(displayedMarker.latitude) : latitude,
      lng: displayedMarker ? parseFloat(displayedMarker.longitude) : longitude
    },
    zoom
  };

  const containerStyle = {
    width: '100%',
    height: '641px'
  };

  // configures map so street view and map type options are hidden and points of interest are hidden to 
  // remove map clutter
  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'all',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      }
    ]
  };

  const [displayMarker, setDisplayMarker] = useState(null);

  // sets displayMarker so map & pins/info window will be rerendered when event is clicked
  const onLoad = marker => {
    setDisplayMarker(marker);
  };

  // sets displayMarker here and in parent so pin and info window will be centered when marker is clicked
  const onClick = (displayMarker, marker) => {
    setDisplayMarker(displayMarker);
    onDisplayedMarkerClick(marker)
  }

  // renders each marker on map when event is clicked
  const renderMarkers = () => {
    return markers.map(marker => {
      return (
        <Marker
          key={marker.eventId}
          displayedMarker={displayedMarker}
          onLoad={onLoad}
          marker={marker}
          displayMarker={displayMarker}
          onDisplayedMarkerClick={onClick}
        />
      );
    });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBoc9XBo-e7KY6PHtDBCI7yqwPID56ILmk">
      <div>
        <GoogleMapReact
          options={mapOptions}
          center={mapProps.center}
          zoom={mapProps.zoom}
          mapContainerStyle={containerStyle}
        >
          {/* Clusterer is needed to display mulitple markers on map*/}
          {/*<MarkerClusterer>{() => renderMarkers()}</MarkerClusterer>*/}
        </GoogleMapReact>
      </div>
    </LoadScript>
  );
};

export default GoogleMap;