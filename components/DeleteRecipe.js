import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { DELETE_RECIPE_ITEM_MUTATION } from './DeleteRecipeItem';
import ButtonStyles from './styles/ButtonStyles';

const DELETE_RECIPE_MUTATION = gql`
  mutation DELETE_RECIPE_MUTATION($id: ID!) {
    deleteRecipe(id: $id) {
      id
      name
    }
  }
`;

const DELETE_RECIPE_IMAGE_MUTATION = gql`
  mutation DELETE_RECIPE_IMAGE_MUTATION($id: ID!) {
    deleteRecipeImage(id: $id) {
      id
    }
  }
`;

const SINGLE_RECIPE_QUERY = gql`
  query SINGLE_RECIPE_QUERY($id: ID!) {
    Recipe(where: { id: $id }) {
      id
      name
      description
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

const ALL_RECIPE_ITEMS_QUERY = gql`
  query ALL_RECIPE_ITEMS_QUERY($id: ID!) {
    allRecipeItems(where: { recipe: { id: $id } }) {
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
    }
  }
`;

function DeleteRecipe({ id, children }) {
  const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION, {
    variables: { id },
    refetchQueries: 'all',
  });

  const { data: recipeData } = useQuery(SINGLE_RECIPE_QUERY, {
    variables: { id },
  });

  const { data: recipeItemsData } = useQuery(ALL_RECIPE_ITEMS_QUERY, {
    variables: { id },
  });

  const [deleteRecipeItem] = useMutation(DELETE_RECIPE_ITEM_MUTATION);

  const [deleteRecipeImage] = useMutation(DELETE_RECIPE_IMAGE_MUTATION, {
    variables: { id: recipeData?.Recipe?.photo?.id },
  });

  return (
    <ButtonStyles
      type="button"
      className="orange delete"
      onClick={async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this recipe?')) {
          if (recipeItemsData?.allRecipeItems) {
            recipeItemsData?.allRecipeItems?.map(async (item) => {
              await deleteRecipeItem({
                variables: {
                  id: item?.id,
                },
              });
            });
          }

          if (recipeData?.Recipe?.photo?.id) {
            await deleteRecipeImage();
          }
          await deleteRecipe();
          Router.push({
            pathname: '/recipes',
          });
        }
      }}
    >
      {children}
    </ButtonStyles>
  );
}

DeleteRecipe.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
};

export { DELETE_RECIPE_IMAGE_MUTATION };

export default DeleteRecipe;
