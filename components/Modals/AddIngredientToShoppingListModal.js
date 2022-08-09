import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useAddIngredientModal } from '../../lib/addIngredientState';
import useForm from '../../lib/useForm';
import FormStyles from '../styles/FormStyles';
import ModalBackgroundStyles from '../styles/ModalBackgroundStyles';
import ModalStyles from '../styles/ModalStyles';
import roundQuantity from '../../lib/roundQuantity';
import DisplayError from '../ErrorMessage';

const ADD_TO_SHOPPING_LIST_MUTATION = gql`
  mutation ADD_TO_SHOPPING_LIST_MUTATION($id: ID!, $quantity: String!) {
    addToShoppingList(ingredientId: $id, quantity: $quantity) {
      id
    }
  }
`;

function AddIngredientToShoppingListModal({ children }) {
  const { addIngredientModalOpen, closeAddIngredientModal, ingredient } =
    useAddIngredientModal();
  const { inputs, handleChange, resetForm } = useForm({
    quantity: '1',
  });
  const [addToShoppingList, { error }] = useMutation(
    ADD_TO_SHOPPING_LIST_MUTATION
  );
  const quantityRef = useRef(null);
  useEffect(() => {
    quantityRef?.current?.focus();
  }, [addIngredientModalOpen]);

  const [warning, setWarning] = useState(null);

  return addIngredientModalOpen ? (
    <>
      <ModalStyles
        className={addIngredientModalOpen && 'open'}
        id="addIngredientToShoppingListModal"
      >
        <FormStyles
          onSubmit={async (e) => {
            e.preventDefault();
            const parsedQuantity = Number.parseFloat(inputs.quantity);

            if (Number.isNaN(parsedQuantity)) {
              setWarning(
                `'${inputs.quantity}' is not a number.  Please enter a numeric value for the quantity.`
              );
            } else {
              await addToShoppingList({
                variables: {
                  id: ingredient.id,
                  quantity: roundQuantity(inputs.quantity).toString(),
                },
                refetchQueries: 'all',
              });
              resetForm();
              closeAddIngredientModal();
            }
          }}
        >
          <h2>Add {ingredient.name} to shopping list</h2>
          <DisplayError error={{ message: warning } || error} />
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
            />{' '}
            {ingredient.units === 'none' ? '' : ingredient.units}
          </div>
          <div>
            <button type="submit" className="submit">
              Add
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => {
                closeAddIngredientModal();
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
            closeAddIngredientModal();
          }}
        >
          &times;
        </button>
      </ModalStyles>
      <ModalBackgroundStyles
        className={addIngredientModalOpen && 'open'}
        onClick={closeAddIngredientModal}
      />
      {children}
    </>
  ) : (
    children
  );
}

AddIngredientToShoppingListModal.propTypes = {
  children: PropTypes.any,
};

export default AddIngredientToShoppingListModal;

export { ADD_TO_SHOPPING_LIST_MUTATION };
