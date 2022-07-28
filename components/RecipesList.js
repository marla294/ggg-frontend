import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import RecipeListItem from './RecipeListItem';
import ListWrapperStyles from './styles/ListWrapperStyles';
import DisplayError from './ErrorMessage';
import ListStyles from './styles/ListStyles';
import groupArrayBy from '../lib/groupArrayBy';
import ListGroupingStyles from './styles/ListGroupingStyles';

const ALL_RECIPES_QUERY = gql`
  query ALL_RECIPES_QUERY {
    allRecipes {
      id
      name
      description
      type
      photo {
        id
        altText
        image {
          id
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function RecipesList({ sortBy }) {
  const { loading, data, error } = useQuery(ALL_RECIPES_QUERY, {
    fetchPolicy: 'network-only',
  });

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
      {sortBy === 'alphabetical' ? (
        <ListStyles>
          {Array.from(data?.allRecipes)
            .sort((a, b) =>
              a?.recipe?.name.toLower() < b?.recipe?.name.toLower() ? -1 : 1
            )
            .map((recipe) => (
              <RecipeListItem recipe={recipe} key={recipe?.id} />
            ))}
        </ListStyles>
      ) : (
        <ListStyles>
          {groupArrayBy(
            Array.from(data?.allRecipes).sort((a, b) =>
              a?.recipe?.name.toLower() < b?.recipe?.name.toLower() ? -1 : 1
            ),
            sortBy
          ).map((grouping) => (
            <ListGroupingStyles key={grouping[0]}>
              <h3>{grouping[0]}</h3>
              <ListStyles>
                {grouping[1].map((item) => (
                  <RecipeListItem recipe={item} key={item?.id} />
                ))}
              </ListStyles>
            </ListGroupingStyles>
          ))}
        </ListStyles>
      )}
    </ListWrapperStyles>
  );
}

export { ALL_RECIPES_QUERY };
