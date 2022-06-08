import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { SINGLE_INGREDIENT_QUERY } from './SingleIngredient';

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
        if (confirm('are you sure you want to delete this item?')) {
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
