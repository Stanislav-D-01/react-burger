import React from "react";
import closeIco from "../../image/Close.svg";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { ModalContext } from "./modal-context";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = (props) => {
  const [setStateModal] = React.useContext(ModalContext);

  React.useEffect(() => {
    document.addEventListener("keydown", keydownEsc);

    return () => {
      document.removeEventListener("keydown", keydownEsc);
    };
  }, []);

  const keydownEsc = (e) => {
    if (e.key === "Escape") {
      setStateModal(false);
    }
  };

  return ReactDOM.createPortal(
    <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
      <ModalOverlay onClose={props.closeModal} />
      <section className={styles["modal__heading"]}>
        <h2 className="text text_type_main-large mt-10 ">{props.name}</h2>
        <CloseIcon onClick={props.closeModal} type="primary" className="mr-4" />
      </section>
      {props.children}
    </div>,
    document.getElementById("modals")
  );
};

export default Modal;

Modal.propTypes = {
  name: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};
