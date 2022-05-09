import { useLazyQuery, useQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useEffect } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Ingredient from './Ingredient';

const IngredientsListStyles = styled.div`
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

export default function IngredientsList({ searchTerm }) {
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_INGREDIENTS_QUERY
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
    <IngredientsListStyles>
      {data?.allIngredients.map((ingredient) => (
        <Ingredient ingredient={ingredient} key={ingredient.id} />
      ))}
    </IngredientsListStyles>
  );
}
