import Modal from "../modal/modal";
import styles from "./ingredient-details.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { dataPropTypes } from "../utils/utils.js";

const IngredientsDetails = (props) => {
  console.log(`!!!!!${props.data}`);
  const modal = document.getElementById("modal");
  return (
    <ModalOverlay onClose={props.closeModal}>
      <Modal closeModal={props.closeModal} name={"Детали ингредиента"}>
        <div className={styles["ingredient-details"]}>
          <img
            src={props.data.image_large}
            className={styles["ingredient-details__image"]}
          />
          <h2 className="text text_type_main-medium mt-4 mb-8">
            {props.data.name}
          </h2>
          <section className={styles["ingredient-details__section-info"]}>
            <div className={styles["ingredient-details__block-info"]}>
              <p className="text text_type_main-small text_color_inactive">
                Калорий, ккал
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {props.data.calories}
              </p>
            </div>
            <div className={styles["ingredient-details__block-info"]}>
              <p className="text text_type_main-small text_color_inactive">
                Белки, г
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {props.data.proteins}
              </p>
            </div>
            <div className={styles["ingredient-details__block-info"]}>
              <p className="text text_type_main-small text_color_inactive">
                Жиры, г
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {props.data.fat}
              </p>
            </div>
            <div className={styles["ingredient-details__block-info"]}>
              <p className="text text_type_main-small text_color_inactive">
                Углеводы, г
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {props.data.carbohydrates}
              </p>
            </div>
          </section>
        </div>
      </Modal>
    </ModalOverlay>
  );
};

export default IngredientsDetails;

IngredientsDetails.propTypes = {
  data: PropTypes.shape(dataPropTypes).isRequired,
};
