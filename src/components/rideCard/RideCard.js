import React, { useState, useEffect } from "react";
import "./RideCard.css";

const RideCard = ({ ride, handleButtonClick }) => {
  const { name, id, is_open, wait_time, last_updated } = ride;

  const importAll = (r) => {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };

  const images = importAll(
    require.context("../ride-images", false, /\.(png|jpe?g|svg)$/)
  );

  const onButtonClick = () => {
    handleButtonClick(id);
  };

  return (
    <div className="rideCard">
      <img className="rideIcon" src={images[`${id}.png`]} alt={name} />
      <div className="rideInfo">
        <div className="rideName">{name}</div>
        {is_open && <div className="rideStatus">{"OPEN"}</div>}
        {!is_open && <div className="rideStatus closed">{"CLOSED"}</div>}
        {is_open && <div className="waitTime">{`${wait_time} minutes`}</div>}
      </div>
      <button className="rideMapButton" onClick={onButtonClick}>Show on Map</button>
    </div>
  );
};

export default RideCard;
