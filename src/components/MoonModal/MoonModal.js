import { Modal, Box, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { DataStore } from "../../system/DataStore";
import styles from "./MoodModal.module.css";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MoonModal({ open, closeModal }) {
  //Set the styles for the modal box
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 500,
    overflowY: "scroll",
    bgcolor: "rgba(0, 0, 0);",
    color: "white",
    border: "2px solid rgba(17, 17, 17);",
    outline: "none",
    boxShadow: 24,
    p: 4,
  };

  //Set the style for the nested component inside the moon modal box
  const nested_style = {
    width: 200,
    bgcolor: "rgba(17, 17, 17);",
    marginTop: 2,
    borderRadius: 2,
    p: 4,
    marginRight: 4,
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  //Set moonsData to the currents planets set of moons
  const moonsData = DataStore.currentPlanet.moons;

  //declare moonsButton
  let moonsButtons;

  //If moons data length is greater than 0, meaning we have some moons, we create a button for each moon
  if (moonsData.length > 0) {
    moonsButtons = moonsData.map((moon, ind) => {
      //Map through each moon and create a Box with that moons information
      return (
        <Box key={ind} sx={nested_style}>
          <h3>{moon.name}</h3>
          <a className={styles.moonLink} target="blank_" href={moon.link}>
            More Info <FontAwesomeIcon icon={faAngleRight} />
          </a>
        </Box>
      );
    });
  }

  //Render a Modal that displays all the moonsButtons inside
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      {/* Fade creates fade in animation for nested elements */}
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Total{" "}
            {DataStore.currentPlanet.name.charAt(0).toUpperCase() +
              DataStore.currentPlanet.name.slice(1)}{" "}
            Moons - {DataStore.currentPlanet.moons.length}
          </Typography>
          {/* List of all moon buttons */}
          <div className={styles.moonRow}>{moonsButtons}</div>
        </Box>
      </Fade>
    </Modal>
  );
}
