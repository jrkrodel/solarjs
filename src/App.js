import "./App.css";
import PlanetData from "./components/PlanetData/PlanetData";
import Distance from "./components/Distance/Distance";
import ModelViewer from "./components/Planet/PlanetViewer";
import MoonModal from "./components/MoonModal/MoonModal";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import {
  DataStore,
  QueryCommand,
  NewPlanetCommand,
  UpdateActiveCommand,
} from "./system/DataStore";

function App() {
  //State for storing current data
  const [data, setData] = useState(null);

  //State for storing the current planet
  const [currentPlanet, setCurrentPlanet] = useState(DataStore.currentPlanet);

  //State for storing what is currently active/being viewed, planets, the moon, or the sun
  const [active, setActive] = useState("planets");

  //State to check if we need to aniamte the planet to come in from the left or right
  const [animateLeft, setAnimateLeft] = useState(false);

  //Runs once, "subscribes" the needed functions and queries our data
  useEffect(() => {
    DataStore.subscribe(onDataUpdate);
    DataStore.subscribe(onPlanetUpdate);
    DataStore.subscribe(onActiveUpdate);
    queryData();
  }, []);

  //When update our selected data, update the data state to that data
  function onDataUpdate() {
    setData(DataStore.data);
  }

  //When we update our currently selected planet, we update the state that tracks the current planet
  function onPlanetUpdate() {
    setCurrentPlanet(DataStore.currentPlanet);
  }

  //When we update our active, the planets, the moon, or the sun, we updating the relevant state
  function onActiveUpdate() {
    setActive(DataStore.active);

    //If active is equal to sun
    if (DataStore.active === "sun") {
      //Set the proper animation
      setAnimateLeft(true);
    } else {
      setAnimateLeft(false);
    }
  }

  //Create query command for querying the data stored in our JSON file
  const queryData = () => {
    //Create new queryCommand
    let cmdQuery = new QueryCommand("data/solarSystem.json");
    //Call queryData found in our DataStore and pass in the created queryCommand
    DataStore.queryData(cmdQuery);
  };

  //Create next planet command for when we travel "right"
  const nextPlanet = () => {
    //Create newPlanetCmomand
    let nextPlanetCommand = new NewPlanetCommand("right");
    //Call newPlanet in DataStore and pass in our creating PlanetCommand
    DataStore.newPlanet(nextPlanetCommand);
    setAnimateLeft(false);
  };

  //Create the command to travel to the prev planet
  const prevPlanet = () => {
    //Create newPlannetCommand to go the prev planet
    let prevPlanetCommand = new NewPlanetCommand("left");
    //Call newPlanet found in DataStore and pass in our created planet Command
    DataStore.newPlanet(prevPlanetCommand);
    setAnimateLeft(true);
  };

  //Create command to update the currently active subset of data
  const changeActive = (string) => {
    //Create UpdateActiveCommand the selected data, the planets, moon, or sun
    let updateActive = new UpdateActiveCommand(string);
    //Call updateActive found in Datastore and pass in our updateActiveCommand
    DataStore.updateActive(updateActive);
  };

  //Commands for controlling the moon modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //If data has been retrieved and exists, we return the following JS
  if (data) {
    return (
      <div className="app">
        <div className={"appContainer"}>
          <Distance />
          <div className="container">
            <div className="buttonContainer">
              {active === "planets" && (
                //If active is equal to planets, we need display arrows to load different planets
                <FontAwesomeIcon
                  className="icon"
                  onClick={prevPlanet}
                  //If we are at the first planet, we do not show left arrow icon
                  icon={
                    currentPlanet.name !== "mercury" ? faAngleLeft : faMinus
                  }
                />
              )}

              <ModelViewer animateLeft={animateLeft} />
              {active === "planets" && (
                //If active is equal to planets we display arrows to load different planets
                <FontAwesomeIcon
                  className="icon"
                  onClick={nextPlanet}
                  //If we are at the last planet, we do not display a right arrow icon
                  icon={
                    currentPlanet.name !== "neptune" ? faAngleRight : faMinus
                  }
                />
              )}
            </div>

            <PlanetData
              key={currentPlanet.name + DataStore.active}
              active={active}
              changeActive={changeActive}
              openModal={handleOpen}
            />
          </div>
          <MoonModal open={open} closeModal={handleClose} />
        </div>
      </div>
    );
  }
}

export default App;
