import { Modal, Box, Typography, Slide, Zoom } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { DataStore } from "../../system/DataStore";
import styles from "./MoodModal.module.css";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MoonModal({ open, closeModal }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    maxHeight: 500,
    bgcolor: "rgba(0, 0, 0);",
    color: "white",
    border: "2px solid rgba(17, 17, 17);",
    outline: "none",
    boxShadow: 24,
    p: 4,
  };

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

  const moonsData = DataStore.currentPlanet.moons;
  let moonsButtons;

  if (moonsData.length > 0) {
    moonsButtons = moonsData.map((moon, ind) => {
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
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {DataStore.currentPlanet.name.charAt(0).toUpperCase() +
              DataStore.currentPlanet.name.slice(1)}{" "}
            Moons
          </Typography>
          <div className={styles.moonRow}>{moonsButtons}</div>
        </Box>
      </Fade>
    </Modal>
  );
}