import PropTypes from 'prop-types';
import { useAddRecipeItemModal } from '../../lib/addRecipeItemState';
import ButtonStyles from '../styles/ButtonStyles';

function AddRecipeItemButton({ recipeId, children }) {
  const { openAddRecipeItemModal, setRecipeId } = useAddRecipeItemModal();

  return (
    <ButtonStyles
      type="button"
      className="addRecipeItem yellow small"
      onClick={() => {
        setRecipeId(recipeId);
        openAddRecipeItemModal();
      }}
    >
      {children}
    </ButtonStyles>
  );
}

AddRecipeItemButton.propTypes = {
  recipeId: PropTypes.string,
  children: PropTypes.any,
};

export default AddRecipeItemButton;
