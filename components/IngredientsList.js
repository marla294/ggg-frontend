import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useEffect } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Ingredient from './Ingredient';
import groupArrayBy from '../lib/groupArrayBy';
import AddIngredientToShoppingListModal from './AddIngredientToShoppingListModal';

const IngredientsListStyles = styled.div`
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

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
`;

const IngredientGroupingStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
`;

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

export default function IngredientsList({ searchTerm, sortBy }) {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data?.allIngredients.length === 0)
    return <p>Sorry, no results found for "{searchTerm}"</p>;
  return (
    <AddIngredientToShoppingListModal>
      <Wrapper>
        {sortBy === 'alphabetical' ? (
          <IngredientsListStyles>
            {data?.allIngredients.map((ingredient) => (
              <Ingredient ingredient={ingredient} key={ingredient.id} />
            ))}
          </IngredientsListStyles>
        ) : (
          groupArrayBy(data?.allIngredients, sortBy).map((grouping) => (
            <IngredientGroupingStyles key={grouping[0]}>
              <h3>{grouping[0]}</h3>
              <IngredientsListStyles>
                {grouping[1].map((ingredient) => (
                  <Ingredient ingredient={ingredient} key={ingredient.id} />
                ))}
              </IngredientsListStyles>
            </IngredientGroupingStyles>
          ))
        )}
      </Wrapper>
    </AddIngredientToShoppingListModal>
  );
}

export { SEARCH_INGREDIENTS_QUERY };
