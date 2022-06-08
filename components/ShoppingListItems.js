import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useEffect } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import groupArrayBy from '../lib/groupArrayBy';
import { useUser } from './User';
import ShoppingListItem from './ShoppingListItem';
import UpdateShoppingListItemModal from './UpdateShoppingItemModal';
import AddShoppingListItemModal from './AddShoppingListItemModal';

const IngredientsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
`;

const IngredientGroupingStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
`;

const SEARCH_SHOPPING_LIST_QUERY = gql`
  query allShoppingListItems($userId: ID!, $searchTerm: String!) {
    allShoppingListItems(
      where: {
        user: { id: $userId }
        ingredient: { name_contains_i: $searchTerm }
      }
    ) {
      id
      ingredient {
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
      quantity
      user {
        id
      }
    }
  }
`;

export default function ShoppingListItems({ searchTerm, sortBy }) {
  const user = useUser();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_SHOPPING_LIST_QUERY,
    {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    }
  );
  const findItemsButChill = debounce(findItems, 5);
  useEffect(() => {
    findItemsButChill({
      variables: {
        userId: user?.id,
        searchTerm,
      },
    });
  }, [searchTerm]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.allShoppingListItems || data?.allShoppingListItems.length === 0)
    return (
      <AddShoppingListItemModal>
        <p>Sorry, no results found for "{searchTerm}"</p>
      </AddShoppingListItemModal>
    );
  return (
    <UpdateShoppingListItemModal>
      <AddShoppingListItemModal>
        <IngredientsListStyles>
          {sortBy === 'alphabetical'
            ? Array.from(data?.allShoppingListItems)
                .sort((a, b) =>
                  a?.ingredient?.name < b?.ingredient?.name ? -1 : 1
                )
                .map((item) => (
                  <ShoppingListItem
                    itemId={item?.id}
                    ingredient={item?.ingredient}
                    quantity={item?.quantity}
                    shoppingListItem={item}
                    key={item?.ingredient?.id}
                  />
                ))
            : groupArrayBy(
                Array.from(data?.allShoppingListItems).sort((a, b) =>
                  a?.ingredient?.name < b?.ingredient?.name ? -1 : 1
                ),
                sortBy,
                'ingredient'
              ).map((grouping) => (
                <IngredientGroupingStyles key={grouping[0]}>
                  <h3>{grouping[0]}</h3>
                  {grouping[1].map((item) => (
                    <ShoppingListItem
                      itemId={item?.id}
                      ingredient={item?.ingredient}
                      quantity={item?.quantity}
                      key={item?.ingredient?.id}
                    />
                  ))}
                </IngredientGroupingStyles>
              ))}
        </IngredientsListStyles>
      </AddShoppingListItemModal>
    </UpdateShoppingListItemModal>
  );
}
