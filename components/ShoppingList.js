import styled from 'styled-components';
import useForm from '../lib/useForm';
import PleaseSignIn from './PleaseSignIn';
import ShoppingListItems from './ShoppingListItems';
import ButtonStyles from './styles/ButtonStyles';
import { useAddShoppingListItemModal } from '../lib/addShoppingListItemState';

const IngredientsBarStyles = styled.div`
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 3rem repeat(2, 1fr);
  font-size: 1.1rem;
  grid-gap: 2rem;

  input,
  select {
    padding: 0.5rem;
    font-size: 1.1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: var(--orange);
    }
  }
`;

const SortByStyles = styled.div`
  display: grid;
  grid-template-columns: minmax(3rem, auto) 1fr;
  align-items: center;
`;

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
