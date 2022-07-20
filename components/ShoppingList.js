/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import styled from 'styled-components';
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
import { DELETE_SHOPPING_LIST_ITEM_MUTATION } from './DeleteShoppingListItemButton';

const ButtonDivStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  width: 100%;
`;

export default function ShoppingList() {
  const { inputs, handleChange } = useForm({
    searchTerm: '',
    sortBy: 'alphabetical',
  });

  const { openAddShoppingListItemModal } = useAddShoppingListItemModal();

  const sortOptions = [
    { display: 'Alphabetical', value: 'alphabetical' },
    { display: 'Aisle', value: 'aisle' },
    { display: 'Home area', value: 'homeArea' },
    { display: 'Store', value: 'store' },
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
        <ButtonDivStyles>
          <ButtonStyles
            type="button"
            className="lime small"
            onClick={() => {
              openAddShoppingListItemModal();
            }}
          >
            Add
          </ButtonStyles>
          <ButtonStyles
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
            Clear
          </ButtonStyles>
        </ButtonDivStyles>
        <SortByStyles>
          <label htmlFor="sortBy">Sort:</label>
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
          placeholder="Search..."
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
