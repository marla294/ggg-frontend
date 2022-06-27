import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';

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

export default function DeleteIngredient({ id, children }) {
  const { data: ingredientData } = useQuery(SINGLE_INGREDIENT_QUERY, {
    variables: { id },
  });

  const [deleteIngredient, { data, error, loading }] = useMutation(
    DELETE_INGREDIENT_MUTATION,
    { variables: { id }, refetchQueries: 'all' }
  );

  const [deleteIngredientImage] = useMutation(
    DELETE_INGREDIENT_IMAGE_MUTATION,
    { variables: { id: ingredientData?.Ingredient?.photo?.id } }
  );

  return (
    <button
      type="button"
      className="orange delete"
      onClick={async () => {
        if (confirm('are you sure you want to delete this ingredient?')) {
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

export { DELETE_INGREDIENT_IMAGE_MUTATION };
