import Modal from "../components/modal/modal";
import IngredientsDetails from "../components/ingredient-details/ingredient-details";

export const ModalIngredient = () => {
  return (
    <Modal name={"Детали ингредиента"}>
      <IngredientsDetails />
    </Modal>
  );
};

export default ModalIngredient;
