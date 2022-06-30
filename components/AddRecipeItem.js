import PropTypes from 'prop-types';
import { useAddRecipeItemModal } from '../lib/addRecipeItemState';

function AddRecipeItem({ recipeId, children }) {
  const { openAddRecipeItemModal, setRecipeId } = useAddRecipeItemModal();

  return (
    <button
      type="button"
      className="addRecipeItem yellow small"
      onClick={() => {
        setRecipeId(recipeId);
        openAddRecipeItemModal();
      }}
    >
      {children}
    </button>
  );
}

AddRecipeItem.propTypes = {
  recipeId: PropTypes.string,
  children: PropTypes.any,
};

export default AddRecipeItem;
