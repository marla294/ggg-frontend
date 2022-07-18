import { useLazyQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import PropTypes, { useEffect, useRef, useState } from 'react';
import { useAddShoppingListItemModal } from '../lib/addShoppingListItemState';
import useForm from '../lib/useForm';
import FormStyles from './styles/FormStyles';
import ModalBackgroundStyles from './styles/ModalBackgroundStyles';
import ModalStyles from './styles/ModalStyles';
import { SEARCH_INGREDIENTS_QUERY } from './IngredientsList';
import { DropDown, DropDownItemCover, DropDownItem } from './styles/Dropdown';
import roundQuantity from '../lib/roundQuantity';

const ADD_TO_SHOPPING_LIST_MUTATION = gql`
  mutation ADD_TO_SHOPPING_LIST_MUTATION($id: ID!, $quantity: String!) {
    addToShoppingList(ingredientId: $id, quantity: $quantity) {
      id
    }
  }
`;

function AddShoppingListItemModal({ children }) {
  const [findIngredients, { data }] = useLazyQuery(SEARCH_INGREDIENTS_QUERY, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });
  const findItemsButChill = debounce(findIngredients, 5);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownClosed, setDropdownClosed] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => {
    findItemsButChill({
      variables: {
        searchTerm,
      },
    });
  }, [searchTerm]);

  const {
    addShoppingListItemModalOpen,
    closeAddShoppingListItemModal,
    ingredient,
    setIngredient,
  } = useAddShoppingListItemModal();
  useEffect(() => {
    searchRef?.current?.focus();
  }, [addShoppingListItemModalOpen]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setDropdownClosed(false);
  };

  const items =
    searchTerm !== '' && data?.allIngredients.length > 0
      ? data?.allIngredients
      : [];

  const { inputs, handleChange, resetForm } = useForm({
    quantity: '1',
  });

  const [addToShoppingList] = useMutation(ADD_TO_SHOPPING_LIST_MUTATION);

  return addShoppingListItemModalOpen ? (
    <>
      <ModalStyles
        className={addShoppingListItemModalOpen && 'open'}
        id="addIngredientToShoppingListModal"
        onClick={() => {
          setDropdownClosed(true);
        }}
      >
        <FormStyles
          onSubmit={async (e) => {
            e.preventDefault();
            const parsedQuantity = parseInt(inputs.quantity);
            if (
              !ingredient ||
              Number.isNaN(parsedQuantity) ||
              parsedQuantity < 1
            )
              return;
            await addToShoppingList({
              variables: {
                id: ingredient.id,
                quantity: roundQuantity(inputs.quantity).toString(),
              },
              refetchQueries: 'all',
            });
            resetForm();
            setSearchTerm('');
            setIngredient(null);
            closeAddShoppingListItemModal();
          }}
        >
          <h2>Add ingredient to shopping list</h2>
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
            <div>
              <input
                id="searchTerm"
                name="searchTerm"
                placeholder='Search for ingredient (eg, "tomato")'
                value={searchTerm}
                onChange={handleSearch}
                ref={searchRef}
              />
              <DropDown
                className={items.length > 0 && !dropdownClosed ? 'open' : ''}
              >
                {items.length > 0 &&
                  items.map((ing) => (
                    <DropDownItemCover
                      key={ing.id}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setIngredient(ing);
                          setSearchTerm(ing.name);
                          setDropdownClosed(true);
                        }
                      }}
                    >
                      <DropDownItem
                        key={ing.id}
                        onClick={() => {
                          setIngredient(ing);
                          setSearchTerm(ing.name);
                          setDropdownClosed(true);
                        }}
                      >
                        {ing?.photo?.image?.publicUrlTransformed ? (
                          <img
                            key={ing.id}
                            src={ing?.photo?.image?.publicUrlTransformed}
                            alt={ing?.photo?.altText || ing?.name}
                          />
                        ) : (
                          <div className="noPhoto" />
                        )}
                        <div>{ing.name}</div>
                      </DropDownItem>
                    </DropDownItemCover>
                  ))}
              </DropDown>
            </div>
          </div>
          <div>
            <button type="submit" className="submit">
              Add
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => {
                closeAddShoppingListItemModal();
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
            closeAddShoppingListItemModal();
          }}
        >
          &times;
        </button>
      </ModalStyles>
      <ModalBackgroundStyles
        className={addShoppingListItemModalOpen && 'open'}
        onClick={closeAddShoppingListItemModal}
      />
      {children}
    </>
  ) : (
    children
  );
}

AddShoppingListItemModal.propTypes = {
  children: PropTypes.any,
};

export default AddShoppingListItemModal;
