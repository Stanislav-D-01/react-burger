import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

type TModalOverlay = {
  onClose: () => void;
};

const ModalOverlay = ({ onClose }: TModalOverlay) => {
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
