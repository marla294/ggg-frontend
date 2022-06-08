import { useLazyQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAddShoppingListItemModal } from '../lib/addShoppingListItemState';
import useForm from '../lib/useForm';
import FormStyles from './styles/FormStyles';
import ModalBackgroundStyles from './styles/ModalBackgroundStyles';
import ModalStyles from './styles/ModalStyles';
import { SEARCH_INGREDIENTS_QUERY } from './IngredientsList';

const DropDown = styled.div`
  display: none;
  position: absolute;
  z-index: 2;
  width: 75%;
  max-height: 20rem;
  overflow: auto;
  border: 1px solid var(--lightGray);
  &.open {
    display: block;
  }
`;

const DropDownItemCover = styled.div`
  background-color: white;
  transition: all 0.1s;
  :hover {
    padding-left: 0.3rem;
    background-color: yellow;
  }
  :focus {
    outline: none;
    padding-left: 0.3rem;
    background-color: yellow;
  }
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid var(--lightGray);
  background: white;
  display: grid;
  grid-template-columns: 4rem auto;
  grid-gap: 1rem;
  align-items: center;
  height: 4rem;
  cursor: pointer;
  img {
    width: 4rem;
    max-height: 3.9rem;
    object-fit: cover;
    padding: 0.5rem;
  }
  .noPhoto {
    width: 4rem;
    height: 100%;
    background-color: var(--orange);
  }
  :hover {
    text-decoration: underline;
  }
`;

const ADD_TO_SHOPPING_LIST_MUTATION = gql`
  mutation ADD_TO_SHOPPING_LIST_MUTATION($id: ID!, $quantity: String!) {
    addToShoppingList(ingredientId: $id, quantity: $quantity) {
      id
    }
  }
`;

export default function AddShoppingListItemModal({ children }) {
  const [findIngredients, { loading, data, error }] = useLazyQuery(
    SEARCH_INGREDIENTS_QUERY,
    {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    }
  );
  const findItemsButChill = debounce(findIngredients, 5);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownClosed, setDropdownClosed] = useState(false);
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
                quantity: parsedQuantity.toString(),
              },
              refetchQueries: 'all',
            });
            resetForm();
            setSearchTerm('');
            setIngredient(null);
            closeAddShoppingListItemModal();
          }}
        >
          <h2>add ingredient to shopping list</h2>
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
                placeholder='search for ingredient (eg, "tomato")'
                value={searchTerm}
                onChange={handleSearch}
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
              add
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => {
                closeAddShoppingListItemModal();
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
