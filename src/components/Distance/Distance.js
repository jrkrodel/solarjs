import styles from "./Distance.module.css";
import { DataStore } from "../../system/DataStore";

export default function Distance() {
  return (
    <div>
      <h1 className={styles.text}>
        Distance Traveled: {DataStore.distance} (miles){" "}
      </h1>
    </div>
  );
}
