import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useUpdateShoppingItemModal } from '../lib/updateShoppingItemState';
import useForm from '../lib/useForm';
import FormStyles from './styles/FormStyles';
import DisplayError from './ErrorMessage';
import ModalBackgroundStyles from './styles/ModalBackgroundStyles';
import ModalStyles from './styles/ModalStyles';

const UPDATE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation UPDATE_SHOPPING_LIST_ITEM_MUTATION($id: ID!, $quantity: String) {
    updateShoppingItemQuantity(ingredientId: $id, quantity: $quantity) {
      id
    }
  }
`;

function UpdateShoppingListItemModal({ children }) {
  const {
    updateShoppingItemModalOpen,
    closeUpdateShoppingItemModal,
    shoppingListItem,
  } = useUpdateShoppingItemModal();

  const { inputs, handleChange, resetForm } = useForm({
    quantity: shoppingListItem?.quantity || '1',
  });

  const [updateShoppingList, { error }] = useMutation(
    UPDATE_SHOPPING_LIST_ITEM_MUTATION
  );

  const quantityRef = useRef(null);

  useEffect(() => {
    quantityRef?.current?.focus();
  }, [updateShoppingItemModalOpen]);

  return updateShoppingItemModalOpen ? (
    <>
      <ModalStyles
        className={updateShoppingItemModalOpen && 'open'}
        id="addIngredientToShoppingListModal"
      >
        <FormStyles
          onSubmit={async (e) => {
            e.preventDefault();
            await updateShoppingList({
              variables: {
                id: shoppingListItem.ingredient.id,
                quantity: inputs.quantity,
              },
              refetchQueries: 'all',
            });
            resetForm();
            closeUpdateShoppingItemModal();
          }}
        >
          <DisplayError error={error} />
          <h2>update {shoppingListItem.ingredient.name} quantity</h2>
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
              update
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => {
                closeUpdateShoppingItemModal();
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
            closeUpdateShoppingItemModal();
          }}
        >
          &times;
        </button>
      </ModalStyles>
      <ModalBackgroundStyles
        className={updateShoppingItemModalOpen && 'open'}
        onClick={closeUpdateShoppingItemModal}
      />
      {children}
    </>
  ) : (
    children
  );
}

UpdateShoppingListItemModal.propTypes = {
  children: PropTypes.any,
};

export default UpdateShoppingListItemModal;
