import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import RideCard from "./rideCard/RideCard";
import GoogleMap from "./GoogleMap/GoogleMap";
import logo from "./mouseTrackerLogo.png";
import markers from "./GoogleMap/DisneyMarkers";
import "./MouseTracker.css";

const MouseTracker = () => {
  const initialState = {
    data: {
      disneyland: null,
      californiaAdventure: null,
    },
    causeOfError: null,
  };
  const [state, setState] = useState(initialState);
  const [displayedRide, setDisplayedRide] = useState(null);
  const [allMarkers] = useState([]);
  const [allRides] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const infoIcon = require("./info.png");

  const loadDisneylandData = async () => {
    try {
      const res = await axios.get("/api/waittimes/16");
      const { data } = res;
      const newState = { ...initialState };
      newState.data.disneyland = data;
      setState(newState);
    } catch (err) {
      const newState = { ...initialState };
      newState.causeOfError = err;
      setState(newState);
    }
  };

  const loadCaliforniaAdventureData = async () => {
    try {
      const res = await axios.get("/api/waittimes/17");
      const { data } = res;
      const newState = { ...initialState };
      newState.data.californiaAdventure = data;
      setState(newState);
    } catch (err) {
      const newState = { ...initialState };
      newState.causeOfError = err;
      setState(newState);
    }
  };

  useEffect(() => {
    loadDisneylandData();
    loadCaliforniaAdventureData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonClick = (id, wait_time, is_open, last_updated) => {
    const status = { wait_time, is_open, last_updated };
    setDisplayedRide([markers[id], allMarkers[id], status]);
    window.scrollTo(0, 0);
  };

  const displayDisneylandData = () => {
    if (!state.data.disneyland || !state.data.californiaAdventure) return;
    const disneylandLands = state.data.disneyland.lands;
    return (
      <div className="landSection">
        {disneylandLands.map((land) => {
          const { name, rides } = land;
          return (
            <div className="land">
              <div className="landName">{name}: </div>
              <div className="rideSection">
                {rides.map((ride) => {
                  allRides[ride.id] = ride;
                  return (
                    <RideCard
                      key={ride.id}
                      ride={ride}
                      handleButtonClick={handleButtonClick}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const handleMarkerClick = (googleMarker, marker) => {
    if (marker.id === "0" || marker.id==="679") {
      setDisplayedRide([marker, googleMarker, null]);
    } else {
      const { wait_time, is_open, last_updated } = allRides[marker.id];
      const newRide = [
        marker,
        googleMarker,
        { wait_time, is_open, last_updated },
      ];
      setDisplayedRide(newRide);
    }
  };

  const handleDisplayMarkerLoad = (id, marker) => {
    // need to update a variable with all google markers so
    // we can reference the one that is clicked by button
    // to send back to map component to display info window
    allMarkers[id] = marker;
  };

  const displayMap = () => {
    return (
      <GoogleMap
        latitude={33.8121}
        longitude={-117.919}
        displayedMarker={displayedRide}
        onDisplayMarkerLoad={handleDisplayMarkerLoad}
        onDisplayedMarkerClick={handleMarkerClick}
        allRides={allRides}
      />
    );
  };

  const displayModal = () => {
    return (
      <div className="modal">
        <div className="modalContent">
          <span class="close" onClick={() => setOpenModal(false)}>
            &times;
          </span>
          <div className="modalText">
              <h2>About Mouse Tracker</h2>
              <p>Mouse Tracker is a single-page web application built on a NodeJS backend and React frontend that pulls in Disneyland ride wait time data from a public API provided by QueueTimes.com. Rides are displayed on a map using Google Maps API.</p>
              <p>This application was built by <a href="http://www.breannanasholm.com/" target="_blank" rel="noopener noreferrer">Breanna Nasholm</a>.</p>
              <h2>Credits</h2>
              <p><a href="https://queue-times.com/" target="_blank" rel="noopener noreferrer">QueueTimes.com</a> - Wait Times API</p>
              <p><a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer">FlatIcon</a> - Icons</p>
              <p><a href="https://www.disney.com/" target="_blank" rel="noopener noreferrer">Disney</a> - Ride Images and Names</p>
        </div>
        </div>
      </div>
    );
  };

  return (
    <div className="outerContainer">
      <img src={logo} alt="Mouse Tracker logo" className="mouseTrackerLogo" />
      <img
        src={infoIcon}
        alt="Info"
        className="infoIcon"
        onClick={() => setOpenModal(true)}
      />
      {openModal && displayModal()}
      {displayMap()}
      <div className="innerContainer">{displayDisneylandData()}</div>
    </div>
  );
};

export default MouseTracker;
