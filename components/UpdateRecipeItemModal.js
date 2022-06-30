import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useUpdateRecipeItemModal } from '../lib/updateRecipeItemState';
import useForm from '../lib/useForm';
import FormStyles from './styles/FormStyles';
import DisplayError from './ErrorMessage';
import ModalBackgroundStyles from './styles/ModalBackgroundStyles';
import ModalStyles from './styles/ModalStyles';

const UPDATE_RECIPE_ITEM_MUTATION = gql`
  mutation UPDATE_RECIPE_ITEM_MUTATION(
    $id: ID!
    $recipeId: ID!
    $quantity: String
  ) {
    updateRecipeItemQuantity(
      ingredientId: $id
      recipeId: $recipeId
      quantity: $quantity
    ) {
      id
    }
  }
`;

function UpdateRecipeItemModal({ recipeId, children }) {
  const { updateRecipeItemModalOpen, closeUpdateRecipeItemModal, recipeItem } =
    useUpdateRecipeItemModal();

  const { inputs, handleChange, resetForm } = useForm({
    quantity: recipeItem?.quantity || '1',
  });
  const [updateRecipe, { error }] = useMutation(UPDATE_RECIPE_ITEM_MUTATION);

  return updateRecipeItemModalOpen ? (
    <>
      <ModalStyles
        className={updateRecipeItemModalOpen && 'open'}
        id="addIngredientToRecipeModal"
      >
        <FormStyles
          onSubmit={async (e) => {
            e.preventDefault();
            await updateRecipe({
              variables: {
                id: recipeItem.ingredient.id,
                recipeId,
                quantity: inputs.quantity,
              },
              refetchQueries: 'all',
            });
            resetForm();
            closeUpdateRecipeItemModal();
          }}
        >
          <DisplayError error={error} />
          <h2>update {recipeItem.ingredient.name} quantity</h2>
          <div className="modalInputContainer">
            <input
              required
              type="text"
              id="quantity"
              name="quantity"
              placeholder="quantity"
              value={inputs.quantity}
              onChange={handleChange}
            />
            {recipeItem.ingredient.units === 'none'
              ? ''
              : recipeItem.ingredient.units}
          </div>
          <div>
            <button type="submit" className="submit">
              update
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => {
                closeUpdateRecipeItemModal();
              }}
            >
              cancel
            </button>
          </div>
        </FormStyles>
        <button
          type="button"
          className="close"
          onClick={() => {
            closeUpdateRecipeItemModal();
          }}
        >
          &times;
        </button>
      </ModalStyles>
      <ModalBackgroundStyles
        className={updateRecipeItemModalOpen && 'open'}
        onClick={closeUpdateRecipeItemModal}
      />
      {children}
    </>
  ) : (
    children
  );
}

UpdateRecipeItemModal.propTypes = {
  recipeId: PropTypes.string,
  children: PropTypes.any,
};

export default UpdateRecipeItemModal;
