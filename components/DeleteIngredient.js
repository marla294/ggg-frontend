import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { DELETE_SHOPPING_LIST_ITEM_MUTATION } from './RemoveItemFromShoppingList';

const DELETE_INGREDIENT_MUTATION = gql`
  mutation DELETE_INGREDIENT_MUTATION($id: ID!) {
    deleteIngredient(id: $id) {
      id
      name
    }
  }
`;

const DELETE_INGREDIENT_IMAGE_MUTATION = gql`
  mutation DELETE_INGREDIENT_IMAGE_MUTATION($id: ID!) {
    deleteIngredientImage(id: $id) {
      id
    }
  }
`;

const SINGLE_INGREDIENT_QUERY = gql`
  query SINGLE_INGREDIENT_QUERY($id: ID!) {
    Ingredient(where: { id: $id }) {
      id
      name
      description
      aisle
      homeArea
      units
      store
      photo {
        id
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

const SHOPPING_LIST_ITEM_QUERY = gql`
  query SHOPPING_LIST_ITEM_QUERY($id: ID!) {
    allShoppingListItems(where: { ingredient: { id: $id } }) {
      id
    }
  }
`;

function DeleteIngredient({ id, children }) {
  const { data: ingredientData } = useQuery(SINGLE_INGREDIENT_QUERY, {
    variables: { id },
  });

  const [deleteIngredient] = useMutation(DELETE_INGREDIENT_MUTATION, {
    variables: { id },
    refetchQueries: 'all',
  });

  const [deleteIngredientImage] = useMutation(
    DELETE_INGREDIENT_IMAGE_MUTATION,
    { variables: { id: ingredientData?.Ingredient?.photo?.id } }
  );

  const { data: shoppingListItemsData } = useQuery(SHOPPING_LIST_ITEM_QUERY, {
    variables: { id },
  });

  const [deleteShoppingListItem] = useMutation(
    DELETE_SHOPPING_LIST_ITEM_MUTATION
  );

  return (
    <button
      type="button"
      className="orange delete"
      onClick={async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('are you sure you want to delete this ingredient?')) {
          shoppingListItemsData.allShoppingListItems.map(
            async (shoppingListItem) => {
              await deleteShoppingListItem({
                variables: { id: shoppingListItem.id },
              });
            }
          );

          if (ingredientData?.Ingredient?.photo?.id) {
            await deleteIngredientImage();
          }
          await deleteIngredient();
          Router.push({
            pathname: '/ingredients',
          });
        }
      }}
    >
      {children}
    </button>
  );
}

DeleteIngredient.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
};

export default DeleteIngredient;

export { DELETE_INGREDIENT_IMAGE_MUTATION };
