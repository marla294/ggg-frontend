import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useEditRecipeItemModal } from '../lib/editRecipeItemState';
import useForm from '../lib/useForm';
import FormStyles from './styles/FormStyles';
import DisplayError from './ErrorMessage';
import ModalBackgroundStyles from './styles/ModalBackgroundStyles';
import ModalStyles from './styles/ModalStyles';
import roundQuantity from '../lib/roundQuantity';

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

function EditRecipeItemModal({ recipeId }) {
  const { editRecipeItemModalOpen, closeEditRecipeItemModal, recipeItem } =
    useEditRecipeItemModal();

  const { inputs, handleChange, resetForm } = useForm({
    quantity: roundQuantity(recipeItem?.quantity / 10).toString() || '1',
  });
  const [updateRecipe, { error }] = useMutation(UPDATE_RECIPE_ITEM_MUTATION);

  const quantityRef = useRef(null);

  useEffect(() => {
    quantityRef?.current?.focus();
  }, [editRecipeItemModalOpen]);

  return editRecipeItemModalOpen ? (
    <>
      <ModalStyles
        className={editRecipeItemModalOpen && 'open'}
        id="addIngredientToRecipeModal"
      >
        <FormStyles
          onSubmit={async (e) => {
            e.preventDefault();
            await updateRecipe({
              variables: {
                id: recipeItem?.ingredient?.id,
                recipeId,
                quantity: roundQuantity(inputs.quantity).toString(),
              },
              refetchQueries: 'all',
            });
            resetForm();
            closeEditRecipeItemModal();
          }}
        >
          <DisplayError error={error} />
          <h2>Edit {recipeItem?.ingredient?.name} quantity</h2>
          <div className="modalInputContainer">
            <input
              required
              type="text"
              id="quantity"
              name="quantity"
              placeholder="quantity"
              value={inputs.quantity}
              onChange={handleChange}
              ref={quantityRef}
            />
            {recipeItem?.ingredient?.units === 'none'
              ? ''
              : recipeItem?.ingredient?.units}
          </div>
          <div>
            <button type="submit" className="submit">
              Update
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => {
                closeEditRecipeItemModal();
              }}
            >
              Cancel
            </button>
          </div>
        </FormStyles>
        <button
          type="button"
          className="close"
          onClick={() => {
            closeEditRecipeItemModal();
          }}
        >
          &times;
        </button>
      </ModalStyles>
      <ModalBackgroundStyles
        className={editRecipeItemModalOpen && 'open'}
        onClick={closeEditRecipeItemModal}
      />
    </>
  ) : (
    <div />
  );
}

EditRecipeItemModal.propTypes = {
  recipeId: PropTypes.string,
};

export default EditRecipeItemModal;
