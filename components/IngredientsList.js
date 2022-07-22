import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import PropTypes, { useEffect } from 'react';
import gql from 'graphql-tag';
import IngredientListItem from './IngredientListItem';
import groupArrayBy from '../lib/groupArrayBy';
import AddIngredientToShoppingListModal from './AddIngredientToShoppingListModal';
import ListWrapperStyles from './styles/ListWrapperStyles';
import DisplayError from './ErrorMessage';
import ListStyles from './styles/ListStyles';
import ListGroupingStyles from './styles/ListGroupingStyles';

const SEARCH_INGREDIENTS_QUERY = gql`
  query SEARCH_INGREDIENTS_QUERY($searchTerm: String!) {
    allIngredients(sortBy: name_ASC, where: { name_contains_i: $searchTerm }) {
      id
      name
      description
      store
      aisle
      homeArea
      units
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

function IngredientsList({ searchTerm, sortBy }) {
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_INGREDIENTS_QUERY,
    {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    }
  );
  const findItemsButChill = debounce(findItems, 5);
  useEffect(() => {
    findItemsButChill({
      variables: {
        searchTerm,
      },
    });
  }, [searchTerm]);

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
  if (data?.allIngredients?.length === 0) {
    if (searchTerm === '') {
      return (
        <ListWrapperStyles>
          <div>Please create some ingredients to get started!</div>
        </ListWrapperStyles>
      );
    }
    return (
      <ListWrapperStyles>
        <div>Sorry, no search results found for "{searchTerm}"</div>
      </ListWrapperStyles>
    );
  }
  return (
    <AddIngredientToShoppingListModal>
      <ListWrapperStyles>
        {sortBy === 'alphabetical' ? (
          <ListStyles>
            {data?.allIngredients.map((ingredient) => (
              <IngredientListItem ingredient={ingredient} key={ingredient.id} />
            ))}
          </ListStyles>
        ) : (
          groupArrayBy(data?.allIngredients, sortBy).map((grouping) => (
            <ListGroupingStyles key={grouping[0]}>
              <h3>{grouping[0]}</h3>
              <ListStyles>
                {grouping[1].map((ingredient) => (
                  <IngredientListItem
                    ingredient={ingredient}
                    key={ingredient.id}
                  />
                ))}
              </ListStyles>
            </ListGroupingStyles>
          ))
        )}
      </ListWrapperStyles>
    </AddIngredientToShoppingListModal>
  );
}

IngredientsList.propTypes = {
  searchTerm: PropTypes.string,
  sortBy: PropTypes.string,
};

export default IngredientsList;

export { SEARCH_INGREDIENTS_QUERY };
