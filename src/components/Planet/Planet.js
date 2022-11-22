import { useRef, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DataStore } from "../../system/DataStore";

const Planet = ({ position = [0, 0, 0] }) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, DataStore.assetURL);

  useFrame((state, delta) => (ref.current.rotation.y += 0.003));

  let scale;

  if (DataStore.active === "planets") {
    console.log(DataStore.active);
    scale = DataStore.currentPlanet.assetScale;
    console.log(scale);
  } else if (DataStore.active === "moon") {
    scale = DataStore.data.moon.assetScale;
  }

  return (
    <>
      <primitive
        ref={ref}
        scale={scale}
        object={gltf.scene}
        position={position}
      />
    </>
  );
};

export default Planet;
