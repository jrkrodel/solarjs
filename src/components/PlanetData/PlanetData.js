import { DataStore } from "../../system/DataStore";
import styles from "./PlanetData.module.css";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PlanetData({ changeActive, openModal }) {
  console.log(DataStore.currentPlanet);
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div
          //use the function we to change the active subset of data to planets
          onClick={() => changeActive("planets")}
          className={
            DataStore.active === "planets"
              ? `${styles.categoryButton} ${styles.active}`
              : `${styles.categoryButton}`
          }
        >
          Planets
        </div>
        <div
          //use the function we to change the active subset of data to the sun
          onClick={() => changeActive("sun")}
          className={
            DataStore.active === "sun"
              ? `${styles.categoryButton} ${styles.active}`
              : `${styles.categoryButton}`
          }
        >
          The Sun
        </div>
        <div
          //use the function we to change the active subset of data to the moon
          onClick={() => changeActive("moon")}
          className={
            DataStore.active === "moon"
              ? `${styles.categoryButton} ${styles.active}`
              : `${styles.categoryButton}`
          }
        >
          The Moon
        </div>
      </div>
      <div className={styles.info}>
        {DataStore.active === "planets" && (
          //If we are currently looking at planets, render the following JSX
          <>
            <div className={styles.col}>
              <h1>{DataStore.currentPlanet.name}</h1>
            </div>
            <div className={styles.col}>
              <p>
                Mass{" "}
                <span className={styles.lightText}>
                  (10<sup>24</sup>kg)
                </span>
                : {DataStore.currentPlanet.mass.toLocaleString()}
              </p>
              <p>
                Diameter <span className={styles.lightText}>(km)</span>:{" "}
                {DataStore.currentPlanet.diameter.toLocaleString()}
              </p>
              <p>
                Density{" "}
                <span className={styles.lightText}>
                  (kg/m<sup>3</sup>)
                </span>
                : {DataStore.currentPlanet.density.toLocaleString()}
              </p>
              <p>
                Gravity{" "}
                <span className={styles.lightText}>
                  (m/s<sup>2</sup>)
                </span>
                : {DataStore.currentPlanet.gravity.toLocaleString()}
              </p>
              <p>
                Length of Day <span className={styles.lightText}>(hours)</span>:{" "}
                {DataStore.currentPlanet.lengthOfDay.toLocaleString()}
              </p>
            </div>
            <div className={styles.col}>
              <p>
                Distance from Sun
                <span className={styles.lightText}>
                  (10<sup>6</sup>km)
                </span>
                : {DataStore.currentPlanet.distanceSun.toLocaleString()}
              </p>
              <p>
                Orbital Period <span className={styles.lightText}>(days)</span>:{" "}
                {DataStore.currentPlanet.orbitalPeriod.toLocaleString()}
              </p>
              <p>
                Orbital Velocity{" "}
                <span className={styles.lightText}>(km/s)</span>:{" "}
                {DataStore.currentPlanet.orbitalVelocity.toLocaleString()}
              </p>
              <p>
                Mean Tempature <span className={styles.lightText}>(C)</span>:{" "}
                {DataStore.currentPlanet.meanTemp.toLocaleString()}
              </p>
              {DataStore.currentPlanet.name === "earth" ? (
                <p
                  onClick={() => changeActive("moon")}
                  className={styles.button}
                >
                  Moons: 1
                  <FontAwesomeIcon icon={faAngleRight} />
                </p>
              ) : (
                DataStore.currentPlanet.moons.length > 0 && (
                  <p onClick={openModal} className={styles.button}>
                    Moons: {DataStore.currentPlanet.moons.length}{" "}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </p>
                )
              )}
            </div>
          </>
        )}
        {DataStore.active === "moon" && (
          //If we are currently viewing the moon, render the following JSX
          <>
            <div className={styles.col}>
              <h1>{DataStore.data.moon.name}</h1>
            </div>
            <div className={styles.col}>
              <p>
                Mass{" "}
                <span className={styles.lightText}>
                  (10<sup>24</sup>kg)
                </span>
                : {DataStore.data.moon.mass.toLocaleString()}
              </p>
              <p>
                Diameter <span className={styles.lightText}>(km)</span>:{" "}
                {DataStore.data.moon.diameter.toLocaleString()}
              </p>
              <p>
                Density{" "}
                <span className={styles.lightText}>
                  (kg/m<sup>3</sup>)
                </span>
                : {DataStore.data.moon.density.toLocaleString()}
              </p>
              <p>
                Gravity{" "}
                <span className={styles.lightText}>
                  (m/s<sup>2</sup>)
                </span>
                : {DataStore.data.moon.gravity.toLocaleString()}
              </p>
              <p>
                Length of Day <span className={styles.lightText}>(hours)</span>:{" "}
                {DataStore.data.moon.lengthOfDay.toLocaleString()}
              </p>
            </div>
            <div className={styles.col}>
              <p>
                Distance from Sun
                <span className={styles.lightText}>
                  (10<sup>6</sup>km)
                </span>
                : {DataStore.data.moon.distanceSun.toLocaleString()}
              </p>
              <p>
                Orbital Period <span className={styles.lightText}>(days)</span>:{" "}
                {DataStore.data.moon.orbitalPeriod.toLocaleString()}
              </p>
              <p>
                Orbital Velocity{" "}
                <span className={styles.lightText}>(km/s)</span>:{" "}
                {DataStore.data.moon.orbitalVelocity.toLocaleString()}
              </p>
              <p>
                Mean Tempature <span className={styles.lightText}>(C)</span>:{" "}
                {DataStore.data.moon.meanTemp.toLocaleString()}
              </p>
            </div>
          </>
        )}
        {DataStore.active === "sun" && (
          //If we are currently viewing the sun, render the following JSX
          <>
            <div className={styles.col}>
              <h1>{DataStore.data.sun.name}</h1>
            </div>
            <div className={styles.col}>
              <p>
                Mass{" "}
                <span className={styles.lightText}>
                  (10<sup>24</sup>kg)
                </span>
                : {DataStore.data.sun.mass.toLocaleString()}
              </p>
              <p>
                Diameter <span className={styles.lightText}>(km)</span>:{" "}
                {DataStore.data.sun.diameter.toLocaleString()}
              </p>
              <p>
                Density{" "}
                <span className={styles.lightText}>
                  (kg/m<sup>3</sup>)
                </span>
                : {DataStore.data.sun.density.toLocaleString()}
              </p>
              <p>
                Gravity{" "}
                <span className={styles.lightText}>
                  (m/s<sup>2</sup>)
                </span>
                : {DataStore.data.sun.gravity.toLocaleString()}
              </p>
              <p>
                Luminosity
                <span className={styles.lightText}>
                  (10<sup>24</sup>J/s)
                </span>
                : {DataStore.data.sun.luminosity.toLocaleString()}
              </p>
            </div>
            <div className={styles.col}>
              <p>
                Energy Production
                <span className={styles.lightText}>
                  (10<sup>-3</sup>J/kg s)
                </span>
                : {DataStore.data.sun.energy.toLocaleString()}
              </p>
              <p>
                Surface Emission{" "}
                <span className={styles.lightText}>
                  {" "}
                  (10<sup>6</sup>J/m<sup>2</sup>s)
                </span>
                : {DataStore.data.sun.emission.toLocaleString()}
              </p>
              <p>Spectral Type: {DataStore.data.sun.type}</p>
              <p>
                Mean Tempature <span className={styles.lightText}>(C)</span>:{" "}
                {DataStore.data.sun.meanTemp.toLocaleString()}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
