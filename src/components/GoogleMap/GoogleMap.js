import React, { useState } from "react";
import {
  GoogleMap as GoogleMapReact,
  LoadScript,
  MarkerClusterer,
} from "@react-google-maps/api";
import Marker from "./Marker";
import markers from "./DisneyMarkers";

const GoogleMap = ({
  displayedMarker,
  latitude,
  longitude,
  onDisplayMarkerLoad,
  zoom = 17,
}) => {

  const [showMap, setShowMap] = useState(false);

  const mapProps = {
    center: {
      // if we have a marker to display, center the map on that, otherwise center on location
      lat: displayedMarker ? displayedMarker[0].latitude : latitude,
      lng: displayedMarker ? displayedMarker[0].longitude : longitude
    },
    zoom: displayedMarker ? 20 : zoom,
  };

  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  // configures map so street view and map type options are hidden and points of interest are hidden to
  // remove map clutter
  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
    ],
  };

  // sets displayMarker so map & pins/info window will be rerendered when event is clicked
  const onLoad = (rideId, googleMarker) => {
    onDisplayMarkerLoad(rideId, googleMarker);
  };

  // renders each marker on map when event is clicked
  const renderMarkers = () => {
    return Object.entries(markers).map(([key, value]) => {
      return <Marker marker={value} displayedMarker={displayedMarker}  onLoad={onLoad}/>
     });
  };

  const displayMap = () => {
    return (
      <GoogleMapReact
        options={mapOptions}
        center={mapProps.center}
        zoom={mapProps.zoom}
        mapContainerStyle={containerStyle}
      >
        {/* Clusterer is needed to display mulitple markers on map*/}
        <MarkerClusterer>{() => renderMarkers()}</MarkerClusterer>
      </GoogleMapReact>
    );
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBoc9XBo-e7KY6PHtDBCI7yqwPID56ILmk">
      {showMap && <div className="mapContainer">{displayMap()}</div>}
      <div className="showHideButton">
        <button onClick={() => setShowMap(!showMap)}>
          {`${showMap ? "Hide" : "Show"} Map`}
        </button>
      </div>
    </LoadScript>
  );
};

export default GoogleMap;
