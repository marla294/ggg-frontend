import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import PropTypes from 'prop-types';
import ButtonStyles from './styles/ButtonStyles';

const DELETE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation DELETE_SHOPPING_LIST_ITEM_MUTATION($id: ID!) {
    deleteShoppingListItem(id: $id) {
      id
    }
  }
`;

function DeleteShoppingListItemButton({ itemId, children }) {
  const [deleteItem] = useMutation(DELETE_SHOPPING_LIST_ITEM_MUTATION, {
    variables: {
      id: itemId,
    },
    refetchQueries: 'all',
  });

  return (
    <ButtonStyles
      type="button"
      className="removeFromShoppingList orange small"
      onClick={async () => {
        if (itemId) {
          await deleteItem();
        }
        Router.push({
          pathname: '/shoppinglist',
        });
      }}
    >
      {children}
    </ButtonStyles>
  );
}

DeleteShoppingListItemButton.propTypes = {
  itemId: PropTypes.string,
  children: PropTypes.any,
};

export { DELETE_SHOPPING_LIST_ITEM_MUTATION };

export default DeleteShoppingListItemButton;
