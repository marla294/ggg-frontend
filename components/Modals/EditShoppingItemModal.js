import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useEditShoppingItemModal } from '../../lib/editShoppingItemState';
import useForm from '../../lib/useForm';
import FormStyles from '../styles/FormStyles';
import DisplayError from '../ErrorMessage';
import ModalBackgroundStyles from '../styles/ModalBackgroundStyles';
import ModalStyles from '../styles/ModalStyles';
import roundQuantity from '../../lib/roundQuantity';

const UPDATE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation UPDATE_SHOPPING_LIST_ITEM_MUTATION($id: ID!, $quantity: String) {
    updateShoppingItemQuantity(ingredientId: $id, quantity: $quantity) {
      id
    }
  }
`;

function EditShoppingListItemModal({ children }) {
  const {
    editShoppingItemModalOpen,
    closeEditShoppingItemModal,
    shoppingListItem,
  } = useEditShoppingItemModal();

  const { inputs, handleChange, resetForm } = useForm({
    quantity: roundQuantity(shoppingListItem?.quantity / 10) || 1,
  });

  const [updateShoppingList, { error }] = useMutation(
    UPDATE_SHOPPING_LIST_ITEM_MUTATION
  );

  const quantityRef = useRef(null);

  useEffect(() => {
    quantityRef?.current?.focus();
  }, [editShoppingItemModalOpen]);

  return editShoppingItemModalOpen ? (
    <>
      <ModalStyles
        className={editShoppingItemModalOpen && 'open'}
        id="addIngredientToShoppingListModal"
      >
        <FormStyles
          onSubmit={async (e) => {
            e.preventDefault();
            await updateShoppingList({
              variables: {
                id: shoppingListItem.ingredient.id,
                quantity: roundQuantity(inputs.quantity).toString(),
              },
              refetchQueries: 'all',
            });
            resetForm();
            closeEditShoppingItemModal();
          }}
        >
          <DisplayError error={error} />
          <h2>Edit "{shoppingListItem.ingredient.name}" quantity</h2>
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
            {shoppingListItem.ingredient.units === 'none'
              ? ''
              : shoppingListItem.ingredient.units}
          </div>
          <div>
            <button type="submit" className="submit">
              Submit
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => {
                closeEditShoppingItemModal();
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
            closeEditShoppingItemModal();
          }}
        >
          &times;
        </button>
      </ModalStyles>
      <ModalBackgroundStyles
        className={editShoppingItemModalOpen && 'open'}
        onClick={closeEditShoppingItemModal}
      />
      {children}
    </>
  ) : (
    children
  );
}

EditShoppingListItemModal.propTypes = {
  children: PropTypes.any,
};

export default EditShoppingListItemModal;
