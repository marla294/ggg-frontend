import { useMutation } from '@apollo/client';
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

export default function DeleteIngredient({ id, children }) {
  const [deleteIngredient, { data, error, loading }] = useMutation(
    DELETE_INGREDIENT_MUTATION,
    { variables: { id } }
  );

  return (
    <button
      type="button"
      className="orange"
      onClick={async () => {
        if (confirm('are you sure you want to delete this item?')) {
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
