import React from "react";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { ModalContext } from "./modal-context";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";

const Modal = (props) => {
  //const [setIsModal] = React.useContext(ModalContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    document.addEventListener("keydown", keydownEsc);

    return () => {
      document.removeEventListener("keydown", keydownEsc);
    };
  }, []);

  const keydownEsc = (e) => {
    if (e.key === "Escape") {
      navigate(-1);
      //  setIsModal(false);
    }
  };

  const location = useLocation();
  const closeModal = () => {
    //   setIsModal(false);
  };
  const close = () => {
    navigate(-1);
  };
  return ReactDOM.createPortal(
    <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
      <ModalOverlay onClose={closeModal} />
      <section className={styles["modal__heading"]}>
        <h2 className="text text_type_main-large mt-10 ">{props.name}</h2>
        <CloseIcon onClick={close} type="primary" className="mr-4" />
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
