import { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DataStore } from "../../system/DataStore";

const Planet = ({ position = [0, 0, 0], url, scale }) => {
  //useRef to set a ref so we can reference a element later
  const ref = useRef();

  //variable to store assset path
  let asset;

  //get asset url, if the url from props is null, we get the current assetURL stored in the datastore
  if (url === null) {
    asset = DataStore.assetURL;
  } else {
    //If url is not null, meaning we passed down a specific url, we get that url
    asset = url;
  }

  //Load the needed asset
  const gltf = useLoader(GLTFLoader, asset);

  //Animate the asset
  useFrame((state, delta) => (ref.current.rotation.y += 0.003));

  //Declare scale
  let planetScale;

  //If scale is passed down from props, we set the planet scale to the pass down value
  if (scale) {
    planetScale = scale;
  } else {
    //If scale not pass down from proprs
    //Check which set of data is currently active and set the scale depending on the set value
    if (DataStore.active === "planets") {
      planetScale = DataStore.currentPlanet.assetScale;
    } else if (DataStore.active === "moon") {
      planetScale = DataStore.data.moon.assetScale;
    } else if (DataStore.active === "sun") {
      planetScale = DataStore.data.sun.assetScale;
    }
  }

  //Render the planet model
  return (
    <>
      <primitive
        ref={ref}
        scale={planetScale}
        object={gltf.scene}
        position={position}
      />
    </>
  );
};

export default Planet;
