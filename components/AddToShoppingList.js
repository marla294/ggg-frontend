import { useAddIngredientModal } from '../lib/addIngredientState';

export default function AddToShoppingList({ ingredient, children }) {
  const { openAddIngredientModal, setIngredient } = useAddIngredientModal();

  return (
    <button
      type="button"
      className="addToShoppingList yellow small"
      onClick={() => {
        setIngredient(ingredient);
        openAddIngredientModal();
      }}
    >
      {children}
    </button>
  );
}
