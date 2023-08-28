import React, { FC, ReactNode } from "react";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { ModalContext } from "./modal-context";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";

type TProps = {
  name?: string;
  page?: string;
  children: ReactNode;
};

const Modal: FC<TProps> = (props) => {
  const location = useLocation();
  //const [setIsModal] = React.useContext(ModalContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    document.addEventListener("keydown", keydownEsc);

    return () => {
      document.removeEventListener("keydown", keydownEsc);
    };
  }, []);

  const keydownEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape" && location.state.history) {
      navigate(location.state.history);
      //  setIsModal(false);
    }
  };

  const closeModal = () => {
    //   setIsModal(false);
  };
  const close: () => void = () => {
    location.state.history && navigate(location.state.history);
  };
  return ReactDOM.createPortal(
    <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
      <ModalOverlay onClose={closeModal} />
      <section className={styles["modal__heading"]}>
        <h2 className="text text_type_main-large mt-10 ">{props.name}</h2>
        <CloseIcon onClick={close} type="primary" />
      </section>
      <div className={styles.children}>{props.children}</div>
    </div>,
    document.getElementById("modals")!
  );
};

export default Modal;
