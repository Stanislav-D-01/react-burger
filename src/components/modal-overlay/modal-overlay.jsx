import styles from "./modal-overlay.module.css";
import React from "react";
import App from "../app/App";
import  ReactDOM  from "react";


const ModalOverlay = ({onClose, children}) => {
  return ( 
<div onClick={onClose}  className={styles["modal-overlay"]}>{children}</div>)
};

export default ModalOverlay;
