import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';

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

export default function DeleteRecipe({ id, children }) {
  const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION, {
    variables: { id },
    refetchQueries: 'all',
  });

  const { data: recipeData } = useQuery(SINGLE_RECIPE_QUERY, {
    variables: { id },
  });

  const [deleteRecipeImage] = useMutation(DELETE_RECIPE_IMAGE_MUTATION, {
    variables: { id: recipeData?.Recipe?.photo?.id },
  });

  return (
    <button
      type="button"
      className="orange delete"
      onClick={async () => {
        if (confirm('are you sure you want to delete this recipe?')) {
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
    </button>
  );
}

export { DELETE_RECIPE_IMAGE_MUTATION };
