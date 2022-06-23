import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import RecipeListItem from './RecipeListItem';
import ListWrapperStyles from './styles/ListWrapperStyles';
import DisplayError from './ErrorMessage';
import ListStyles from './styles/ListStyles';

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
      <ListStyles>
        {data?.allRecipes.map((recipe) => (
          <RecipeListItem recipe={recipe} key={recipe?.id} />
        ))}
      </ListStyles>
    </ListWrapperStyles>
  );
}
