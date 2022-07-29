import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useState } from 'react';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';
import recipeTypes from '../lib/recipeTypes';
import AlertMessage from './AlertMessage';

const CREATE_RECIPE_MUTATION = gql`
  mutation CREATE_RECIPE_MUTATION(
    $name: String!
    $description: String!
    $recipeType: String
  ) {
    createRecipe(
      data: { name: $name, description: $description, type: $recipeType }
    ) {
      id
    }
  }
`;

const UPDATE_RECIPE_IMAGE_MUTATION = gql`
  mutation UPDATE_RECIPE_IMAGE_MUTATION(
    $id: ID!
    $image: Upload
    $name: String!
  ) {
    updateRecipe(
      id: $id
      data: { photo: { create: { image: $image, altText: $name } } }
    ) {
      id
    }
  }
`;

export default function CreateRecipeForm() {
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    description: '',
    recipeType: recipeTypes[0],
  });
  const [createRecipe, { error }] = useMutation(CREATE_RECIPE_MUTATION, {
    variables: inputs,
    refetchQueries: 'all',
  });
  const [updateRecipeImage] = useMutation(UPDATE_RECIPE_IMAGE_MUTATION);
  const [successMessage, setSuccessMessage] = useState(null);
  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await createRecipe();
        if (inputs.image && res?.data?.createRecipe?.id) {
          await updateRecipeImage({
            variables: {
              id: res?.data?.createRecipe?.id,
              name: inputs.name,
              image: inputs.image,
            },
          }).catch(console.error);
        }
        clearForm();
        setSuccessMessage(`Recipe "${inputs.name}" created successfully`);
      }}
    >
      <fieldset>
        <h2>Create New Recipe</h2>
        <DisplayError error={error} />
        <AlertMessage message={successMessage} />
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
        <label htmlFor="image">
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
        </label>
        <label htmlFor="recipeType">
          Type of Recipe
          <select
            type="text"
            name="recipeType"
            id="recipeType"
            onChange={handleChange}
            value={inputs.recipeType}
          >
            {recipeTypes.map((recipeType) => (
              <option value={recipeType} key={recipeType}>
                {recipeType}
              </option>
            ))}
          </select>
        </label>
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
