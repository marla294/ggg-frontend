/* eslint-disable react/jsx-filename-extension */
import { useAddRecipeItemModal } from '../../lib/addRecipeItemState';
import ButtonStyles from '../styles/ButtonStyles';

interface Props {
  recipeId: string;
  children: any;
}

function AddRecipeItemButton({ recipeId, children }: Props) {
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

export default AddRecipeItemButton;
