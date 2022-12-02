import { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DataStore } from "../../system/DataStore";

const Planet = ({ position = [0, 0, 0], url, scale }) => {
  //useRef to set a ref so we can reference a element later
  const ref = useRef();
  let asset;
  //get asset url
  if (url === null) {
    asset = DataStore.assetURL;
  } else {
    asset = url;
  }
  //Load the needed asset
  const gltf = useLoader(GLTFLoader, asset);

  //Animate the asset
  useFrame((state, delta) => (ref.current.rotation.y += 0.003));

  //Declare scale
  let planetScale;

  //Check which set of data is currently active and set the scale depending on the set value
  if (scale) {
    planetScale = scale;
  } else {
    if (DataStore.active === "planets") {
      scale = DataStore.currentPlanet.assetScale;
    } else if (DataStore.active === "moon") {
      scale = DataStore.data.moon.assetScale;
    } else if (DataStore.active === "sun") {
      scale = DataStore.data.sun.assetScale;
    }
  }

  //Render the planet model
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
