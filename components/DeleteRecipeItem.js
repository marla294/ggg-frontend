import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
// import Router from 'next/router';

const DELETE_RECIPE_ITEM_MUTATION = gql`
  mutation DELETE_RECIPE_ITEM_MUTATION($id: ID!) {
    deleteRecipeItem(id: $id) {
      id
    }
  }
`;

export default function DeleteRecipeItem({ itemId, children }) {
  const [deleteItem] = useMutation(DELETE_RECIPE_ITEM_MUTATION, {
    variables: {
      id: itemId,
    },
    refetchQueries: 'all',
  });

  return (
    <button
      type="button"
      className="delete orange small"
      onClick={async () => {
        if (
          confirm(
            'are you sure you want to delete this ingredient from the recipe?'
          )
        ) {
          if (itemId) {
            await deleteItem();
          }
        }
      }}
    >
      {children}
    </button>
  );
}
