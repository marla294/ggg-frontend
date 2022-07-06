/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import useForm from '../lib/useForm';
import PleaseSignIn from './PleaseSignIn';
import ShoppingListItems, {
  SEARCH_SHOPPING_LIST_QUERY,
} from './ShoppingListItems';
import ButtonStyles from './styles/ButtonStyles';
import { useAddShoppingListItemModal } from '../lib/addShoppingListItemState';
import IngredientsBarStyles from './styles/IngredientsBarStyles';
import SortByStyles from './styles/SortByStyles';
import { useUser } from './User';
import { DELETE_SHOPPING_LIST_ITEM_MUTATION } from './RemoveItemFromShoppingList';

export default function ShoppingList() {
  const { inputs, handleChange } = useForm({
    searchTerm: '',
    sortBy: 'alphabetical',
  });

  const { openAddShoppingListItemModal } = useAddShoppingListItemModal();

  const sortOptions = [
    { display: 'alphabetical', value: 'alphabetical' },
    { display: 'aisle', value: 'aisle' },
    { display: 'home area', value: 'homeArea' },
    { display: 'store', value: 'store' },
  ];

  const [findShoppingListItems, { data: shoppingListItems }] = useLazyQuery(
    SEARCH_SHOPPING_LIST_QUERY
  );

  const user = useUser();

  const [deleteShoppingListItem] = useMutation(
    DELETE_SHOPPING_LIST_ITEM_MUTATION,
    {
      refetchQueries: 'all',
    }
  );

  useEffect(() => {
    findShoppingListItems({
      variables: {
        userId: user?.id,
        searchTerm: '',
      },
    });
  }, []);

  return (
    <PleaseSignIn>
      <IngredientsBarStyles>
        <ButtonStyles>
          <button
            type="button"
            className="lime small"
            onClick={() => {
              openAddShoppingListItemModal();
            }}
          >
            add
          </button>
          <button
            type="button"
            className="yellow small"
            onClick={() => {
              if (
                confirm(
                  'are you sure you want to clear the entire shopping list?'
                )
              ) {
                shoppingListItems?.allShoppingListItems?.forEach((item) => {
                  deleteShoppingListItem({
                    variables: {
                      id: item?.id,
                    },
                  });
                });
              }
            }}
          >
            clear list
          </button>
        </ButtonStyles>
        <SortByStyles>
          <label htmlFor="sortBy">sort:</label>
          <select
            name="sortBy"
            id="sortBy"
            value={inputs.sortBy}
            onChange={handleChange}
          >
            {sortOptions.map((option) => (
              <option
                value={option.value}
                name={option.value}
                id={option.value}
                key={Math.random()}
              >
                {option.display}
              </option>
            ))}
          </select>
        </SortByStyles>
        <input
          name="searchTerm"
          id="searchTerm"
          placeholder="search..."
          value={inputs.searchTerm}
          onChange={handleChange}
        />
      </IngredientsBarStyles>
      <ShoppingListItems
        searchTerm={inputs.searchTerm}
        sortBy={inputs.sortBy}
      />
    </PleaseSignIn>
  );
}
