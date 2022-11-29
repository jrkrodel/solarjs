import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styles from "./Planet.module.css";
import { DataStore } from "../../system/DataStore";
import Planet from "./Planet";

const ModelViewer = ({ position = [0, 0, 0], animateLeft }) => {
  return (
    //Set the key to the currently set a assetURL, so whenever we update that this gets rerendered
    //which triggers the animation to play
    <div
      key={DataStore.assetURL}
      className={`${styles.container} ${
        animateLeft ? `${styles.animateLeft}` : `${styles.animateRight}`
      }`}
    >
      {/* Set ambient light intensity depending on if we are viewing the sun or not */}
      {/* Create Canvas to display 3D model, the Planet component */}
      <Canvas>
        {DataStore.active === "sun" ? (
          <ambientLight intensity={2} />
        ) : (
          <ambientLight intensity={0.3} />
        )}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <Planet position={position} />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
