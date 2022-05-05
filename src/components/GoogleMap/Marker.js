import React from "react";
import { Marker as GoogleMarker, InfoWindow } from "@react-google-maps/api";
import { useState, useRef } from "react";
import markers from "./DisneyMarkers";

const styles = (theme) => ({
  marker: {
    display: "flex",
    alignItems: "center",
    width: "180px",
  },
  infoWindow: {
    padding: "22px",
    fontWeight: "600",
  },
});
// const redIcon = null; //require('Images/MapIcons/markerIconRed.png');
// const blueIcon = null; //require('Images/MapIcons/markerIconBlue.png');
const blueIcon = require("./map-icons/markerIconBlue.png");

const Marker = ({
  marker,
  displayedMarker,
  onLoad,
  onDisplayedMarkerClick,
}) => {
  const markerRef = useRef(null);

  if (!marker) return <></>;

  const { latitude, longitude, id, rideName } = marker;
  const displayed = displayedMarker && displayedMarker[0].id === id;

  const position = {
    lat: latitude,
    lng: longitude,
  };

  const renderInfoWindow = () => {
    return (
      <InfoWindow anchor={displayedMarker[1]}>
        <div className="infoWindow">{rideName}</div>
      </InfoWindow>
    );
  };

  const onClick = () => {
    onDisplayedMarkerClick(markerRef.current.marker, marker);
  };

  return (
    <div>
      <GoogleMarker
        position={position}
        icon={blueIcon}
        ref={markerRef}
        onLoad={(googleMarker) => onLoad(id, googleMarker)}
        onClick={onClick}
      />
      {displayed && renderInfoWindow()}
    </div>
  );
};

export default Marker;
