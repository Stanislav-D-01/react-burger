import React from "react";
import closeIco from "../../image/Close.svg";
import styles from "./modal.module.css";

class Modal extends React.Component {
  state = {
    data: {},
  };
  componentWillMount() {
    this.setState({ data: this.props.data });
  }
  render() {
    const modalOverlay = document.getElementsByClassName(".modal-overlay");
    return (
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
      </div>
    );
  }
}

export default Modal;
