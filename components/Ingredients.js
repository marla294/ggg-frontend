import styled from 'styled-components';
import Router from 'next/router';
import ButtonStyles from './styles/ButtonStyles';
import useForm from '../lib/useForm';
import IngredientsList from './IngredientsList';
import PleaseSignIn from './PleaseSignIn';

const IngredientsBarStyles = styled.div`
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export default function Ingredients() {
  const { inputs, handleChange } = useForm({
    searchTerm: '',
  });

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
        <input
          name="searchTerm"
          id="searchTerm"
          placeholder="search..."
          value={inputs.searchTerm}
          onChange={handleChange}
        />
      </IngredientsBarStyles>
      <IngredientsList searchTerm={inputs.searchTerm} />
    </PleaseSignIn>
  );
}
