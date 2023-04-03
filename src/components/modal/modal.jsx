import React from "react";
import closeIco from "../../image/Close.svg";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Modal extends React.Component {
  render() {
    return ReactDOM.createPortal(
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <section className={styles["modal__heading"]}>
          <h2 className="text text_type_main-large mt-10 ml-10">
            {this.props.name}
          </h2>
          <img
            onClick={this.props.closeModal}
            src={closeIco}
            alt={"Закрыть"}
            className={styles["modal__close-ico"]}
          />
        </section>
        {this.props.children}
      </div>,
      document.getElementById("root")
    );
  }
}

export default Modal;

Modal.propTypes = {
  name: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node
};
