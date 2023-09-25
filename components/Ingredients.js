/* eslint-disable jsx-a11y/label-has-associated-control */
import Router from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import ButtonStyles from './styles/ButtonStyles';
import useForm from '../lib/useForm';
import IngredientsList from './IngredientsList';
import PleaseSignIn from './PleaseSignIn';
import IngredientsBarStyles from './styles/IngredientsBarStyles';

export const ButtonDivStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
`;

export default function Ingredients() {
  const { inputs, handleChange } = useForm({
    searchTerm: '',
    sortBy: 'alphabetical',
  });

  return (
    <PleaseSignIn>
      <Head>
        <title>Ingredients | Go Get Ur Groceries</title>
      </Head>
      <IngredientsBarStyles>
        <ButtonDivStyles>
          <ButtonStyles
            type="button"
            className="lime small"
            onClick={() => {
              Router.push({ pathname: '/createingredient' });
            }}
          >
            Add
          </ButtonStyles>
        </ButtonDivStyles>
        <input
          name="searchTerm"
          id="searchTerm"
          placeholder="Search..."
          value={inputs.searchTerm}
          onChange={handleChange}
        />
      </IngredientsBarStyles>
      <h2>Ingredients</h2>
      <IngredientsList searchTerm={inputs.searchTerm} sortBy={inputs.sortBy} />
    </PleaseSignIn>
  );
}
