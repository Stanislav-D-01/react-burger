import styles from "./modal-overlay.module.css";
import React from "react";

const ModalOverlay = (props) => {
  return <div className={styles["modal-overlay"]}>{props.children}</div>;
};

export default ModalOverlay;
