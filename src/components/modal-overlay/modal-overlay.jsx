import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => {



  return (
    <div
      id={"modalOverlay"}
      onClick={onClose}
      className={styles["modal-overlay"]}
    ></div>
  );
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
