import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useAddIngredientModal } from '../lib/addIngredientState';
import useForm from '../lib/useForm';
import FormStyles from './styles/FormStyles';
import ModalBackgroundStyles from './styles/ModalBackgroundStyles';
import ModalStyles from './styles/ModalStyles';

const ADD_TO_SHOPPING_LIST_MUTATION = gql`
  mutation ADD_TO_SHOPPING_LIST_MUTATION($id: ID!, $quantity: String!) {
    addToShoppingList(ingredientId: $id, quantity: $quantity) {
      id
    }
  }
`;

export default function AddIngredientToShoppingListModal({ children }) {
  const { addIngredientModalOpen, closeAddIngredientModal, ingredient } =
    useAddIngredientModal();
  const { inputs, handleChange, resetForm } = useForm({
    quantity: '1',
  });
  const [addToShoppingList] = useMutation(ADD_TO_SHOPPING_LIST_MUTATION);

  return addIngredientModalOpen ? (
    <>
      <ModalStyles
        className={addIngredientModalOpen && 'open'}
        id="addIngredientToShoppingListModal"
      >
        <FormStyles
          onSubmit={async (e) => {
            e.preventDefault();
            await addToShoppingList({
              variables: {
                id: ingredient.id,
                quantity: inputs.quantity,
              },
              refetchQueries: 'all',
            });
            resetForm();
            closeAddIngredientModal();
          }}
        >
          <h2>add {ingredient.name} to shopping list</h2>
          <div className="modalInputContainer">
            <input
              required
              type="text"
              id="quantity"
              name="quantity"
              placeholder="quantity"
              value={inputs.quantity}
              onChange={handleChange}
            />{' '}
            {ingredient.units === 'none' ? '' : ingredient.units}
          </div>
          <div>
            <button type="submit" className="submit">
              add
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => {
                closeAddIngredientModal();
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

export { ADD_TO_SHOPPING_LIST_MUTATION };
