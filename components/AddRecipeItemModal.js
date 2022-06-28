import { useLazyQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { useAddRecipeItemModal } from '../lib/addRecipeItemState';
import useForm from '../lib/useForm';
import FormStyles from './styles/FormStyles';
import ModalBackgroundStyles from './styles/ModalBackgroundStyles';
import ModalStyles from './styles/ModalStyles';
import { SEARCH_INGREDIENTS_QUERY } from './IngredientsList';
import { DropDown, DropDownItemCover, DropDownItem } from './styles/Dropdown';

const ADD_TO_RECIPE_MUTATION = gql`
  mutation ADD_TO_RECIPE_MUTATION(
    $id: ID!
    $recipeId: ID!
    $quantity: String!
  ) {
    addToRecipe(ingredientId: $id, recipeId: $recipeId, quantity: $quantity) {
      id
    }
  }
`;

export default function AddRecipeItemModal({ children, recipeId }) {
  const [findIngredients, { data }] = useLazyQuery(SEARCH_INGREDIENTS_QUERY, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });
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
    addRecipeItemModalOpen,
    closeAddRecipeItemModal,
    ingredient,
    setIngredient,
  } = useAddRecipeItemModal();

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

  const [addToRecipe] = useMutation(ADD_TO_RECIPE_MUTATION);

  return addRecipeItemModalOpen ? (
    <>
      <ModalStyles
        className={addRecipeItemModalOpen && 'open'}
        id="addRecipeItemModal"
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
            await addToRecipe({
              variables: {
                id: ingredient.id,
                recipeId,
                quantity: parsedQuantity.toString(),
              },
              refetchQueries: 'all',
            });
            resetForm();
            setSearchTerm('');
            setIngredient(null);
            closeAddRecipeItemModal();
          }}
        >
          <h2>add ingredient to recipe</h2>
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
                closeAddRecipeItemModal();
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
            closeAddRecipeItemModal();
          }}
        >
          &times;
        </button>
      </ModalStyles>
      <ModalBackgroundStyles
        className={addRecipeItemModalOpen && 'open'}
        onClick={closeAddRecipeItemModal}
      />
      {children}
    </>
  ) : (
    children
  );
}
