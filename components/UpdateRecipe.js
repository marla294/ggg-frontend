import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import { DELETE_RECIPE_IMAGE_MUTATION } from './DeleteRecipe';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';
import { ALL_RECIPE_ITEMS_QUERY, SINGLE_RECIPE_QUERY } from './SingleRecipe';
import ListStyles from './styles/ListStyles';
import RecipeIngredient from './RecipeIngredient';
import ButtonStyles from './styles/ButtonStyles';
import AddRecipeItem from './AddRecipeItem';
import AddRecipeItemModal from './AddRecipeItemModal';

const UPDATE_RECIPE_MUTATION = gql`
  mutation UPDATE_RECIPE_MUTATION(
    $id: ID!
    $name: String!
    $description: String
  ) {
    updateRecipe(id: $id, data: { name: $name, description: $description }) {
      name
      description
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

export default function UpdateRecipe({ id }) {
  const { data, loading } = useQuery(SINGLE_RECIPE_QUERY, {
    variables: {
      id,
    },
  });

  const [updateRecipe, { error: updateError, loading: updateLoading }] =
    useMutation(UPDATE_RECIPE_MUTATION);

  const [updateRecipeImage] = useMutation(UPDATE_RECIPE_IMAGE_MUTATION);

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
            await updateRecipeImage({
              variables: {
                id,
                name: inputs.name,
                image: inputs.image,
              },
            }).catch(console.error);
          }
          await updateRecipe({
            variables: {
              id,
              name: inputs.name,
              description: inputs.description,
            },
            refetchQueries: 'all',
          }).catch(console.error);
          Router.push({
            pathname: `/recipe/${id}`,
          });
        }}
      >
        <fieldset disabled={updateLoading}>
          <h2>Update Recipe</h2>
          <DisplayError error={updateError} />
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
              placeholder="description"
              value={inputs.description}
              onChange={handleChange}
            />
          </label>
          <div>
            <h3>Recipe Ingredients</h3>
            <ButtonStyles>
              <AddRecipeItem recipeId={id}>
                add ingredient to recipe
              </AddRecipeItem>
            </ButtonStyles>
            <ListStyles>
              {allRecipeItemsData.allRecipeItems.map((item) => (
                <RecipeIngredient
                  ingredient={item?.ingredient}
                  quantity={item?.quantity}
                  recipeItemId={item?.id}
                  key={item?.ingredient?.id}
                />
              ))}
            </ListStyles>
          </div>
          <button type="submit" className="submit">
            Update Recipe
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
      <AddRecipeItemModal />
    </>
  );
}
