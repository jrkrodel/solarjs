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
  faDash,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import {
  DataStore,
  QueryCommand,
  NewPlanetCommand,
  UpdateActiveCommand,
} from "./system/DataStore";

function App() {
  const [data, setData] = useState(null);
  const [currentPlanet, setCurrentPlanet] = useState(DataStore.currentPlanet);
  const [active, setActive] = useState("planets");
  const [animateRight, setAnimateRight] = useState(false);
  const [animateLeft, setAnimateLeft] = useState(false);

  useEffect(() => {
    DataStore.subscribe(onDataUpdate);
    DataStore.subscribe(onPlanetUpdate);
    DataStore.subscribe(onActiveUpdate);
    queryData();
  }, []);

  function onDataUpdate() {
    setData(DataStore.data);
  }

  function onPlanetUpdate() {
    setCurrentPlanet(DataStore.currentPlanet);
  }

  function onActiveUpdate() {
    setActive(DataStore.active);
    if (DataStore.active === "sun") {
      setAnimateRight(false);
      setAnimateLeft(true);
    } else {
      setAnimateLeft(false);
      setAnimateRight(true);
    }
  }

  const queryData = () => {
    let cmdQuery = new QueryCommand("data/solarSystem.json");
    DataStore.queryData(cmdQuery);
  };

  const nextPlanet = () => {
    let nextPlanetCommand = new NewPlanetCommand("right");
    DataStore.newPlanet(nextPlanetCommand);
    setAnimateLeft(false);
    setAnimateRight(true);
  };

  const prevPlanet = () => {
    let prevPlanetCommand = new NewPlanetCommand("left");
    DataStore.newPlanet(prevPlanetCommand);
    setAnimateRight(false);
    setAnimateLeft(true);
  };

  const changeActive = (string) => {
    let updateActive = new UpdateActiveCommand(string);
    DataStore.updateActive(updateActive);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  if (data) {
    return (
      <div className="app">
        <div className={"appContainer"}>
          <Distance />

          <div className="container">
            <div className="buttonContainer">
              {active === "planets" && (
                <FontAwesomeIcon
                  className="icon"
                  onClick={prevPlanet}
                  icon={
                    currentPlanet.name !== "mercury" ? faAngleLeft : faMinus
                  }
                />
              )}

              <ModelViewer
                animateRight={animateRight}
                animateLeft={animateLeft}
              />
              {active === "planets" && (
                <FontAwesomeIcon
                  className="icon"
                  onClick={nextPlanet}
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
