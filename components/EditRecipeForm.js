import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useForm from '../lib/useForm';
import { DELETE_RECIPE_IMAGE_MUTATION } from './Buttons/DeleteRecipeButton';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';
import { ALL_RECIPE_ITEMS_QUERY, SINGLE_RECIPE_QUERY } from './SingleRecipe';
import recipeTypes from '../lib/recipeTypes';
import AlertMessage from './AlertMessage';

const UPDATE_RECIPE_MUTATION = gql`
  mutation UPDATE_RECIPE_MUTATION(
    $id: ID!
    $name: String!
    $recipeLink: String!
    $description: String
    $type: String
  ) {
    updateRecipe(
      id: $id
      data: {
        name: $name
        recipeLink: $recipeLink
        description: $description
        type: $type
      }
    ) {
      name
      recipeLink
      description
      type
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

function EditRecipeForm({ id }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const { data, loading } = useQuery(SINGLE_RECIPE_QUERY, {
    variables: {
      id,
    },
  });

  const [editRecipe, { error: editError, loading: editLoading }] = useMutation(
    UPDATE_RECIPE_MUTATION
  );

  const [editRecipeImage] = useMutation(UPDATE_RECIPE_IMAGE_MUTATION);

  const { inputs, handleChange, resetForm } = useForm(data?.Recipe);

  const [deleteRecipeImage] = useMutation(DELETE_RECIPE_IMAGE_MUTATION, {
    variables: { id: data?.Recipe?.photo?.id },
  });

  const { data: allRecipeItemsData } = useQuery(ALL_RECIPE_ITEMS_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <FormStyles
        onSubmit={async (e) => {
          e.preventDefault();
          if (inputs.image) {
            if (data?.Ingredient?.photo?.id) {
              await deleteRecipeImage();
            }
            await editRecipeImage({
              variables: {
                id,
                name: inputs.name,
                image: inputs.image,
              },
            }).catch(console.error);
          }
          await editRecipe({
            variables: {
              id,
              name: inputs.name,
              recipeLink: inputs.recipeLink,
              description: inputs.description,
              type: inputs.type,
            },
            refetchQueries: 'all',
          }).catch(console.error);

          const date = new Date();
          setSuccessMessage(
            `Recipe has been edited successfully (${date.toLocaleString(
              'en-US',
              {
                weekday: 'short', // long, short, narrow
                day: 'numeric', // numeric, 2-digit
                year: 'numeric', // numeric, 2-digit
                month: 'long', // numeric, 2-digit, long, short, narrow
                hour: 'numeric', // numeric, 2-digit
                minute: 'numeric', // numeric, 2-digit
                second: 'numeric', // numeric, 2-digit
              }
            )})`
          );
        }}
      >
        <fieldset disabled={editLoading}>
          <h2>Edit Recipe</h2>
          <DisplayError error={editError} />
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
          <label htmlFor="recipeLink">
            Recipe link
            <input
              type="text"
              id="recipeLink"
              name="recipeLink"
              placeholder="Link to recipe"
              value={inputs.recipeLink}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="image">
            Image
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              rows="7"
              id="description"
              name="description"
              placeholder="Description"
              value={inputs.description}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="type">
            Type of recipe
            <select
              type="text"
              name="type"
              id="type"
              onChange={handleChange}
              value={inputs.type}
            >
              {recipeTypes.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="submit">
            Submit
          </button>
          <button type="button" className="clear" onClick={resetForm}>
            Reset Form
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
    </>
  );
}

EditRecipeForm.propTypes = {
  id: PropTypes.string,
};

export default EditRecipeForm;
