import React from "react";
import "./GoogleMap.css";

const blueIcon = require("./map-icons/markerIconBlue.png");
const grayIcon = require("./map-icons/markerIconGray.png");
const greenIcon = require("./map-icons/markerIconGreen.png");
const yellowIcon = require("./map-icons/markerIconYellow.png");
const redIcon = require("./map-icons/markerIconRed.png");

const Legend = ({ classes }) => {
  return (
    <div className="legend">
      <div className="legendLine">
        <img className="legendIcon" src={grayIcon} alt="blue pin" />
        Ride Closed
      </div>
      <div className="legendLine">
        <img className="legendIcon" src={greenIcon} alt="green pin" />
        Wait Time Less than 30 minutes
      </div>
      <div className="legendLine">
        <img className="legendIcon" src={yellowIcon} alt="red pin" />
        Wait Time 30-60 minutes
      </div>
      <div className="legendLine">
        <img className="legendIcon" src={redIcon} alt="red pin" />
        Wait Time Greater than 60 minutes
      </div>
      <div className="legendLine">
        <img className="legendIcon" src={blueIcon} alt="red pin" />
        Landmark
      </div>
    </div>
  );
};

export default Legend;
