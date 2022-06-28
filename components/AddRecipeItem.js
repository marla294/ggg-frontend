import { useAddRecipeItemModal } from '../lib/addRecipeItemState';

export default function AddRecipeItem({ recipeId, children }) {
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
