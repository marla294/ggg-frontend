import styled from 'styled-components';
import Router from 'next/router';
import ButtonStyles from './styles/ButtonStyles';
import useForm from '../lib/useForm';
import IngredientsList from './IngredientsList';
import PleaseSignIn from './PleaseSignIn';

const IngredientsBarStyles = styled.div`
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export default function Ingredients() {
  const { inputs, handleChange } = useForm({
    searchTerm: '',
    sortBy: 'alphabetical',
  });

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
              Router.push({ pathname: '/createingredient' });
            }}
          >
            New Ingredient
          </button>
        </ButtonStyles>
        <label htmlFor="sortBy">
          sort by:&nbsp;
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
        </label>
        <input
          name="searchTerm"
          id="searchTerm"
          placeholder="search..."
          value={inputs.searchTerm}
          onChange={handleChange}
        />
      </IngredientsBarStyles>
      <IngredientsList searchTerm={inputs.searchTerm} sortBy={inputs.sortBy} />
    </PleaseSignIn>
  );
}
