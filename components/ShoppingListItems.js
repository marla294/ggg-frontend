import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useEffect } from 'react';
import gql from 'graphql-tag';
import groupArrayBy from '../lib/groupArrayBy';
import { useUser } from './User';
import ShoppingListItem from './ShoppingListItem';
import UpdateShoppingListItemModal from './UpdateShoppingItemModal';
import AddShoppingListItemModal from './AddShoppingListItemModal';
import ListWrapperStyles from './styles/ListWrapperStyles';
import DisplayError from './ErrorMessage';
import ListStyles from './styles/ListStyles';
import ListGroupingStyles from './styles/ListGroupingStyles';

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
  if (!data?.allShoppingListItems || data?.allShoppingListItems.length === 0)
    return (
      <AddShoppingListItemModal>
        <ListWrapperStyles>
          <div>Sorry, no results found for "{searchTerm}"</div>
        </ListWrapperStyles>
      </AddShoppingListItemModal>
    );
  return (
    <UpdateShoppingListItemModal>
      <AddShoppingListItemModal>
        <ListWrapperStyles>
          {sortBy === 'alphabetical' ? (
            <ListStyles>
              {Array.from(data?.allShoppingListItems)
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
                ))}
            </ListStyles>
          ) : (
            groupArrayBy(
              Array.from(data?.allShoppingListItems).sort((a, b) =>
                a?.ingredient?.name < b?.ingredient?.name ? -1 : 1
              ),
              sortBy,
              'ingredient'
            ).map((grouping) => (
              <ListGroupingStyles key={grouping[0]}>
                <h3>{grouping[0]}</h3>
                <ListStyles>
                  {grouping[1].map((item) => (
                    <ShoppingListItem
                      itemId={item?.id}
                      ingredient={item?.ingredient}
                      quantity={item?.quantity}
                      key={item?.ingredient?.id}
                    />
                  ))}
                </ListStyles>
              </ListGroupingStyles>
            ))
          )}
        </ListWrapperStyles>
      </AddShoppingListItemModal>
    </UpdateShoppingListItemModal>
  );
}
