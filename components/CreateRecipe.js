import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';
// import { UPDATE_INGREDIENT_IMAGE_MUTATION } from './UpdateIngredient';

const CREATE_RECIPE_MUTATION = gql`
  mutation CREATE_RECIPE_MUTATION($name: String!) {
    createRecipe(data: { name: $name }) {
      id
    }
  }
`;

export default function CreateRecipe() {
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
  });
  const [createRecipe, { loading, error }] = useMutation(
    CREATE_RECIPE_MUTATION,
    {
      variables: inputs,
      refetchQueries: 'all',
    }
  );
  // const [updateIngredientImage] = useMutation(UPDATE_INGREDIENT_IMAGE_MUTATION);
  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await createRecipe();
        // if (inputs.image && res?.data?.createIngredient?.id) {
        //   await updateIngredientImage({
        //     variables: {
        //       id: res?.data?.createIngredient?.id,
        //       name: inputs.name,
        //       image: inputs.image,
        //     },
        //   }).catch(console.error);
        // }
        clearForm();
        Router.push({
          pathname: `/recipes`,
        });
      }}
    >
      <fieldset>
        <h2>Create New Recipe</h2>
        <DisplayError error={error} />
        <label htmlFor="name">
          Name<span className="required">&nbsp;*</span>
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        {/* <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            rows="7"
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label> */}
        <button type="submit" className="submit">
          Create Recipe
        </button>
        <button type="button" className="clear" onClick={clearForm}>
          Clear Form
        </button>
        <button
          type="button"
          className="cancel"
          onClick={() => {
            Router.push({
              pathname: '/recipes',
            });
          }}
        >
          Cancel
        </button>
      </fieldset>
    </FormStyles>
  );
}
