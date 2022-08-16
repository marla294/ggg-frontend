/* eslint-disable jsx-a11y/label-has-associated-control */
import Router from 'next/router';
import styled from 'styled-components';
import ButtonStyles from './styles/ButtonStyles';
import PleaseSignIn from './PleaseSignIn';
import IngredientsBarStyles from './styles/IngredientsBarStyles';
import RecipesList from './RecipesList';
import SortByStyles from './styles/SortByStyles';
import useForm from '../lib/useForm';

const ButtonDivStyles = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  width: 100%;
`;

const sortOptions = [
  { display: 'Alphabetical', value: 'alphabetical' },
  { display: 'Type', value: 'type' },
];

export default function Recipes() {
  const { inputs, handleChange } = useForm({
    sortBy: 'alphabetical',
  });

  return (
    <PleaseSignIn>
      <IngredientsBarStyles>
        <ButtonDivStyles>
          <ButtonStyles
            type="button"
            className="lime small"
            onClick={() => {
              Router.push({ pathname: '/createrecipe' });
            }}
          >
            Add
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
      </IngredientsBarStyles>
      <h2>Recipes</h2>
      <RecipesList sortBy={inputs.sortBy} />
    </PleaseSignIn>
  );
}
