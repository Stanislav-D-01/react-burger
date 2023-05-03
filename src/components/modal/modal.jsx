import React from "react";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { ModalContext } from "./modal-context";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = (props) => {
  const [setIsModal] = React.useContext(ModalContext);

  React.useEffect(() => {
    document.addEventListener("keydown", keydownEsc);

    return () => {
      document.removeEventListener("keydown", keydownEsc);
    };
  }, []);

  const keydownEsc = (e) => {
    if (e.key === "Escape") {
      setIsModal(false);
    }
  };
  const closeModal = () => {
    setIsModal(false);
  };

  return ReactDOM.createPortal(
    <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
      <ModalOverlay onClose={closeModal} />
      <section className={styles["modal__heading"]}>
        <h2 className="text text_type_main-large mt-10 ">{props.name}</h2>
        <CloseIcon onClick={closeModal} type="primary" className="mr-4" />
      </section>
      {props.children}
    </div>,
    document.getElementById("modals")
  );
};

export default Modal;

Modal.propTypes = {
  name: PropTypes.string,
  
  children: PropTypes.node,
};
