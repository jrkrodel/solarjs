import { DataStore } from "../../system/DataStore";
import styles from "./PlanetData.module.css";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PlanetData({ changeActive, openModal }) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div
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
                : {DataStore.currentPlanet.mass}
              </p>
              <p>
                Diameter <span className={styles.lightText}>(km)</span>:{" "}
                {DataStore.currentPlanet.diameter}
              </p>
              <p>
                Density{" "}
                <span className={styles.lightText}>
                  (kg/m<sup>3</sup>)
                </span>
                : {DataStore.currentPlanet.density}
              </p>
              <p>
                Gravity{" "}
                <span className={styles.lightText}>
                  (m/s<sup>2</sup>)
                </span>
                : {DataStore.currentPlanet.gravity}
              </p>
              <p>
                Length of Day <span className={styles.lightText}>(hours)</span>:{" "}
                {DataStore.currentPlanet.lengthOfDay}
              </p>
            </div>
            <div className={styles.col}>
              <p>
                Distance from Sun
                <span className={styles.lightText}>
                  (10<sup>6</sup>km)
                </span>
                : {DataStore.currentPlanet.distanceSun}
              </p>
              <p>
                Orbital Period <span className={styles.lightText}>(days)</span>:{" "}
                {DataStore.currentPlanet.orbitalPeriod}
              </p>
              <p>
                Orbital Velocity{" "}
                <span className={styles.lightText}>(km/s)</span>:{" "}
                {DataStore.currentPlanet.orbitalVelocity}
              </p>
              <p>
                Mean Tempature <span className={styles.lightText}>(C)</span>:{" "}
                {DataStore.currentPlanet.meanTemp}
              </p>
              {DataStore.currentPlanet.moons.length > 0 && (
                <p onClick={openModal} className={styles.button}>
                  Moons: {DataStore.currentPlanet.moons.length}{" "}
                  <FontAwesomeIcon icon={faAngleRight} />
                </p>
              )}
            </div>
          </>
        )}
        {DataStore.active === "moon" && (
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
                : {DataStore.data.moon.mass}
              </p>
              <p>
                Diameter <span className={styles.lightText}>(km)</span>:{" "}
                {DataStore.data.moon.diameter}
              </p>
              <p>
                Density{" "}
                <span className={styles.lightText}>
                  (kg/m<sup>3</sup>)
                </span>
                : {DataStore.data.moon.density}
              </p>
              <p>
                Gravity{" "}
                <span className={styles.lightText}>
                  (m/s<sup>2</sup>)
                </span>
                : {DataStore.data.moon.gravity}
              </p>
              <p>
                Length of Day <span className={styles.lightText}>(hours)</span>:{" "}
                {DataStore.data.moon.lengthOfDay}
              </p>
            </div>
            <div className={styles.col}>
              <p>
                Distance from Sun
                <span className={styles.lightText}>
                  (10<sup>6</sup>km)
                </span>
                : {DataStore.data.moon.distanceSun}
              </p>
              <p>
                Orbital Period <span className={styles.lightText}>(days)</span>:{" "}
                {DataStore.data.moon.orbitalPeriod}
              </p>
              <p>
                Orbital Velocity{" "}
                <span className={styles.lightText}>(km/s)</span>:{" "}
                {DataStore.data.moon.orbitalVelocity}
              </p>
              <p>
                Mean Tempature <span className={styles.lightText}>(C)</span>:{" "}
                {DataStore.data.moon.meanTemp}
              </p>
            </div>
          </>
        )}
        {DataStore.active === "sun" && (
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
                : {DataStore.data.sun.mass}
              </p>
              <p>
                Diameter <span className={styles.lightText}>(km)</span>:{" "}
                {DataStore.data.sun.diameter}
              </p>
              <p>
                Density{" "}
                <span className={styles.lightText}>
                  (kg/m<sup>3</sup>)
                </span>
                : {DataStore.data.sun.density}
              </p>
              <p>
                Gravity{" "}
                <span className={styles.lightText}>
                  (m/s<sup>2</sup>)
                </span>
                : {DataStore.data.sun.gravity}
              </p>
              <p>
                Luminosity
                <span className={styles.lightText}>
                  (10<sup>24</sup>J/s)
                </span>
                : {DataStore.data.sun.luminosity}
              </p>
            </div>
            <div className={styles.col}>
              <p>
                Energy Production
                <span className={styles.lightText}>
                  (10<sup>-3</sup>J/kg s)
                </span>
                : {DataStore.data.sun.energy}
              </p>
              <p>
                Surface Emission{" "}
                <span className={styles.lightText}>
                  {" "}
                  (10<sup>6</sup>J/m<sup>2</sup>s)
                </span>
                : {DataStore.data.sun.emission}
              </p>
              <p>Spectral Type: {DataStore.data.sun.type}</p>
              <p>
                Mean Tempature <span className={styles.lightText}>(C)</span>:{" "}
                {DataStore.data.sun.meanTemp}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
