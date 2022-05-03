import React, { useState, useEffect } from "react";
import "./RideCard.css";

const RideCard = ({ ride }) => {
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

  return (
    <div className="rideCard">
      <div className="card">
        <img className="rideIcon" floated="left" src={images[`${id}.png`]} />
        <div className="rideInfo">
          <div className="rideName">{name}</div>
          {is_open && <div className="rideStatus">{"OPEN"}</div>}
          {!is_open && <div className="rideStatus closed">{"CLOSED"}</div>}
          {is_open && <div className="waitTime">{`${wait_time} minutes`}</div>}
        </div>
      </div>
    </div>
  );
};

export default RideCard;

/*
<Card
    image={images[`${id}.png`]}
    header={name}
    meta={`${is_open ? "OPEN" : "CLOSED"}`}
    description={`${wait_time} minutes`}
  />
  */
