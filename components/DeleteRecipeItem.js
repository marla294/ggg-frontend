/* eslint-disable no-restricted-globals */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const DELETE_RECIPE_ITEM_MUTATION = gql`
  mutation DELETE_RECIPE_ITEM_MUTATION($id: ID!) {
    deleteRecipeItem(id: $id) {
      id
    }
  }
`;

function DeleteRecipeItem({ itemId, children }) {
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
            'Are you sure you want to delete this ingredient from the recipe?'
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

DeleteRecipeItem.propTypes = {
  itemId: PropTypes.string,
  children: PropTypes.any,
};

export { DELETE_RECIPE_ITEM_MUTATION };

export default DeleteRecipeItem;
