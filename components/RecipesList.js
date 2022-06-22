import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import gql from 'graphql-tag';
import RecipeListItem from './RecipeListItem';
import ListWrapperStyles from './styles/ListWrapperStyles';
import DisplayError from './ErrorMessage';

const RecipesListStyles = styled.div`
  display: grid;
  grid-template-areas: 'a a';
  gap: 1rem;
  grid-auto-columns: minmax(10rem, 20rem);
  @media (min-width: 768px) {
    grid-template-areas: 'a';
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
`;

const ALL_RECIPES_QUERY = gql`
  query ALL_RECIPES_QUERY {
    allRecipes {
      id
      name
    }
  }
`;

export default function RecipesList() {
  const { loading, data, error } = useQuery(ALL_RECIPES_QUERY);

  if (loading)
    return (
      <ListWrapperStyles>
        <div>Loading...</div>
      </ListWrapperStyles>
    );
  if (error)
    return (
      <ListWrapperStyles>
        <DisplayError error={error} />
      </ListWrapperStyles>
    );
  if (data?.allRecipes.length === 0)
    return (
      <ListWrapperStyles>
        <div>Please create some recipes to get started!</div>
      </ListWrapperStyles>
    );
  return (
    <ListWrapperStyles>
      <RecipesListStyles>
        {data?.allRecipes.map((recipe) => (
          <RecipeListItem recipe={recipe} />
        ))}
      </RecipesListStyles>
    </ListWrapperStyles>
  );
}
