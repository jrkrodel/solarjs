import styles from "./Distance.module.css";
import { DataStore } from "../../system/DataStore";

//Render distance at the top of the screen, retriving the distance value from the DataStore
export default function Distance() {
  return (
    <div>
      <h1 className={styles.text}>
        Distance Traveled: {DataStore.distance.toLocaleString()} (miles){" "}
      </h1>
    </div>
  );
}
