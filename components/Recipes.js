import Router from 'next/router';
import ButtonStyles from './styles/ButtonStyles';
import PleaseSignIn from './PleaseSignIn';
import IngredientsBarStyles from './styles/IngredientsBarStyles';
import RecipesList from './RecipesList';

export default function Recipes() {
  return (
    <PleaseSignIn>
      <IngredientsBarStyles>
        <ButtonStyles>
          <button
            type="button"
            className="lime small"
            onClick={() => {
              Router.push({ pathname: '/createrecipe' });
            }}
          >
            add
          </button>
        </ButtonStyles>
      </IngredientsBarStyles>
      <RecipesList />
    </PleaseSignIn>
  );
}
