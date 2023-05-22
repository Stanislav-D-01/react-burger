import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ModalOverlay = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div
      id={"modalOverlay"}
      onClick={() => navigate(-1)}
      className={styles["modal-overlay"]}
    ></div>
  );
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
