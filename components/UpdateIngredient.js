import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import { DELETE_INGREDIENT_IMAGE_MUTATION } from './DeleteIngredient';
import DisplayError from './ErrorMessage';
import { SINGLE_INGREDIENT_QUERY } from './SingleIngredient';
import FormStyles from './styles/FormStyles';

const UPDATE_INGREDIENT_MUTATION = gql`
  mutation UPDATE_INGREDIENT_MUTATION(
    $id: ID!
    $name: String!
    $description: String
    $aisle: String
    $store: String
    $units: String
    $homeArea: String
  ) {
    updateIngredient(
      id: $id
      data: {
        name: $name
        description: $description
        aisle: $aisle
        store: $store
        units: $units
        homeArea: $homeArea
      }
    ) {
      name
      description
      aisle
      store
      units
      homeArea
    }
  }
`;

const UPDATE_INGREDIENT_IMAGE_MUTATION = gql`
  mutation UPDATE_INGREDIENT_IMAGE_MUTATION(
    $id: ID!
    $image: Upload
    $name: String!
  ) {
    updateIngredient(
      id: $id
      data: { photo: { create: { image: $image, altText: $name } } }
    ) {
      id
    }
  }
`;

export default function UpdateIngredient({ id }) {
  const { data, loading } = useQuery(SINGLE_INGREDIENT_QUERY, {
    variables: {
      id,
    },
  });

  const [updateIngredient, { error: updateError, loading: updateLoading }] =
    useMutation(UPDATE_INGREDIENT_MUTATION);

  const [updateIngredientImage] = useMutation(UPDATE_INGREDIENT_IMAGE_MUTATION);

  const { inputs, handleChange, resetForm } = useForm(data?.Ingredient);

  const [deleteIngredientImage] = useMutation(
    DELETE_INGREDIENT_IMAGE_MUTATION,
    { variables: { id: data?.Ingredient?.photo?.id } }
  );

  if (loading) return <p>Loading...</p>;
  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        if (inputs.image) {
          if (data?.Ingredient?.photo?.id) {
            await deleteIngredientImage();
          }
          await updateIngredientImage({
            variables: {
              id,
              name: inputs.name,
              image: inputs.image,
            },
          }).catch(console.error);
        }
        await updateIngredient({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            aisle: inputs.aisle,
            store: inputs.store,
            homeArea: inputs.homeArea,
            units: inputs.units,
          },
          refetchQueries: 'all',
        }).catch(console.error);
        Router.push({
          pathname: `/ingredient/${id}`,
        });
      }}
    >
      <fieldset disabled={updateLoading}>
        <h2>Update Ingredient</h2>
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
        <label htmlFor="store">
          Store
          <select
            type="text"
            name="store"
            id="store"
            onChange={handleChange}
            value={inputs.store}
          >
            <option value="uncategorized">uncategorized</option>
            <option value="family fare">family fare</option>
            <option value="hyvee">hyvee</option>
            <option value="whole foods">whole foods</option>
          </select>
        </label>
        <label htmlFor="units">
          Units
          <select
            type="text"
            name="units"
            id="units"
            onChange={handleChange}
            value={inputs.units}
          >
            <option value="none">none</option>
            <option value="can">can</option>
            <option value="cup">cup</option>
            <option value="lb">lb</option>
            <option value="oz">oz</option>
            <option value="tbs">tbs</option>
            <option value="tsp">tsp</option>
          </select>
        </label>
        <label htmlFor="aisle">
          Aisle
          <select
            type="text"
            name="aisle"
            id="aisle"
            onChange={handleChange}
            value={inputs.aisle}
          >
            <option value="uncategorized">uncategorized</option>
            <option value="baked goods">baked goods</option>
            <option value="bakery">bakery</option>
            <option value="canned goods">canned goods</option>
            <option value="condiments">condiments</option>
            <option value="dairy">dairy</option>
            <option value="frozen">frozen</option>
            <option value="meat">meat</option>
            <option value="paper">paper</option>
            <option value="pasta">pasta</option>
            <option value="produce">produce</option>
            <option value="seafood">seafood</option>
          </select>
        </label>
        <label htmlFor="homeArea">
          Home Area
          <select
            type="text"
            name="homeArea"
            id="homeArea"
            onChange={handleChange}
            value={inputs.homeArea}
          >
            <option value="uncategorized">uncategorized</option>
            <option value="freezer">freezer</option>
            <option value="fridge">fridge</option>
            <option value="kitchen">kitchen</option>
            <option value="pantry">pantry</option>
            <option value="upstairs">upstairs</option>
          </select>
        </label>
        <button type="submit" className="submit">
          Update Ingredient
        </button>
        <button type="button" className="clear" onClick={resetForm}>
          Reset Form
        </button>
        <button
          type="button"
          className="cancel"
          onClick={() => {
            Router.push({
              pathname: '/ingredients',
            });
          }}
        >
          Cancel
        </button>
      </fieldset>
    </FormStyles>
  );
}

export { UPDATE_INGREDIENT_IMAGE_MUTATION };
