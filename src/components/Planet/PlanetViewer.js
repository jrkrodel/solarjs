import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styles from "./Planet.module.css";
import { DataStore } from "../../system/DataStore";
import Planet from "./Planet";

const ModelViewer = ({ position = [0, 0, 0], animateLeft, url, scale }) => {
  if (url === null) {
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
            <Planet position={position} url={null} scale={null} />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
    );
  } else {
    return (
      <Canvas>
        <spotLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <Planet
            position={[0, 0, 0]}
            rotate={[10, 10, 10]}
            url={url}
            scale={scale}
          />
        </Suspense>
      </Canvas>
    );
  }
};

export default ModelViewer;
