import React, { useState, useEffect } from "react";
import axios from "axios";
import RideCard from "./rideCard/RideCard";
import GoogleMap from "./GoogleMap/GoogleMap";
import logo from "./mouseTrackerLogo.png";
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
  const [showMap, setShowMap] = useState(false);

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
                  return <RideCard ride={ride} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const displayMap = () => {
    return <GoogleMap latitude={33.8121} longitude={-117.919} />;
  };

  return (
    <div className="outerContainer">
        <img src={logo} alt="Mouse Tracker logo" className="mouseTrackerLogo"/>
      {/*{showMap && <div className="mapContainer">{displayMap()}</div>}
      <div className="showHideButton">
        <Button primary onClick={() => setShowMap(!showMap)}>
          {`${showMap ? 'Hide' : 'Show'} Map`}
        </Button>
      </div> */}
      <div className="innerContainer">{displayDisneylandData()}</div>
    </div>
  );
};

export default MouseTracker;