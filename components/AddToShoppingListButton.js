import PropTypes from 'prop-types';
import { useAddIngredientModal } from '../lib/addIngredientState';
import ButtonStyles from './styles/ButtonStyles';

function AddToShoppingListButton({ ingredient, children }) {
  const { openAddIngredientModal, setIngredient } = useAddIngredientModal();

  return (
    <ButtonStyles
      type="button"
      className="addToShoppingList yellow small"
      onClick={() => {
        setIngredient(ingredient);
        openAddIngredientModal();
      }}
    >
      {children}
    </ButtonStyles>
  );
}

AddToShoppingListButton.propTypes = {
  ingredient: PropTypes.object,
  children: PropTypes.any,
};

export default AddToShoppingListButton;
