import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { DELETE_SHOPPING_LIST_ITEM_MUTATION } from './DeleteShoppingListItemButton';
import { DELETE_RECIPE_ITEM_MUTATION } from './DeleteRecipeItemButton';
import ButtonStyles from './styles/ButtonStyles';

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

const RECIPE_LIST_ITEM_QUERY = gql`
  query RECIPE_LIST_ITEM_QUERY($id: ID!) {
    allRecipeItems(where: { ingredient: { id: $id } }) {
      id
    }
  }
`;

function DeleteIngredientButton({ id, noHover, children }) {
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

  const { data: recipeItemsData } = useQuery(RECIPE_LIST_ITEM_QUERY, {
    variables: { id },
  });

  const [deleteShoppingListItem] = useMutation(
    DELETE_SHOPPING_LIST_ITEM_MUTATION
  );

  const [deleteRecipeItem] = useMutation(DELETE_RECIPE_ITEM_MUTATION);

  return (
    <ButtonStyles
      type="button"
      className={noHover ? 'delete orange-nohover' : 'delete orange'}
      onClick={async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this ingredient?')) {
          // delete any existing shopping list items using this ingredient
          await shoppingListItemsData?.allShoppingListItems?.map(
            async (shoppingListItem) => {
              await deleteShoppingListItem({
                variables: { id: shoppingListItem.id },
              });
            }
          );

          // delete any existing recipe items using this ingredient
          await recipeItemsData?.allRecipeItems?.map(async (recipeItem) => {
            await deleteRecipeItem({
              variables: { id: recipeItem.id },
            });
          });

          if (ingredientData?.Ingredient?.photo?.id) {
            await deleteIngredientImage();
          }
          await deleteIngredient();
        }
      }}
    >
      {children}
    </ButtonStyles>
  );
}

DeleteIngredientButton.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
  noHover: PropTypes.bool,
};

export default DeleteIngredientButton;

export { DELETE_INGREDIENT_IMAGE_MUTATION };
