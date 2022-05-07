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

const blueIcon = require("./map-icons/markerIconBlue.png");
const grayIcon = require("./map-icons/markerIconGray.png");
const greenIcon = require("./map-icons/markerIconGreen.png");
const yellowIcon = require("./map-icons/markerIconYellow.png");
const redIcon = require("./map-icons/markerIconRed.png");

const Marker = ({
  marker,
  displayedMarker,
  onLoad,
  onDisplayedMarkerClick,
  allRides,
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
    const ride = allRides[id];
    if (displayed && ride) {
      const wait_time = ride.wait_time;
      const is_open = ride.is_open;
      const last_updated = displayedMarker[2].last_updated;
      return (
        <InfoWindow anchor={displayedMarker[1]}>
          <div>
            <div>{rideName}</div>
            <div>{is_open ? "OPEN" : "CLOSED"}</div>
            <div>{`${wait_time} minutes`}</div>
          </div>
        </InfoWindow>
      );
    }
  };

  const onClick = () => {
    onDisplayedMarkerClick(markerRef.current.marker, marker);
  };

  const iconToDisplay = () => {
    const ride = allRides[id];
    if (ride) {
      const wait_time = ride.wait_time;
      const is_open = ride.is_open;
      if (!is_open) return grayIcon;
      else if (wait_time < 30) return greenIcon;
      else if (wait_time >= 30 && wait_time <= 60) return yellowIcon;
      else if (wait_time > 60) return redIcon;
    }
    console.log(id);
    return blueIcon;
  };

  return (
    <div>
      <GoogleMarker
        position={position}
        icon={iconToDisplay()}
        ref={markerRef}
        onLoad={(googleMarker) => onLoad(id, googleMarker)}
        onClick={onClick}
      />
      {renderInfoWindow()}
    </div>
  );
};

export default Marker;
