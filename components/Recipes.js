import Router from 'next/router';
import styled from 'styled-components';
import ButtonStyles from './styles/ButtonStyles';
import PleaseSignIn from './PleaseSignIn';
import IngredientsBarStyles from './styles/IngredientsBarStyles';
import RecipesList from './RecipesList';

const ButtonDivStyles = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  width: 100%;
`;

export default function Recipes() {
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
      </IngredientsBarStyles>
      <RecipesList />
    </PleaseSignIn>
  );
}
