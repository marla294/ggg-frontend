import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';

const DELETE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation DELETE_SHOPPING_LIST_ITEM_MUTATION($id: ID!) {
    deleteShoppingListItem(id: $id) {
      id
    }
  }
`;

export default function RemoveItemFromShoppingList({ itemId, children }) {
  const [deleteItem] = useMutation(DELETE_SHOPPING_LIST_ITEM_MUTATION, {
    variables: {
      id: itemId,
    },
    refetchQueries: 'all',
  });

  return (
    <button
      type="button"
      className="removeFromShoppingList orange small"
      onClick={async () => {
        if (
          confirm('are you sure you want to delete this shopping list item?')
        ) {
          if (itemId) {
            await deleteItem();
          }
          Router.push({
            pathname: '/shoppinglist',
          });
        }
      }}
    >
      {children}
    </button>
  );
}
