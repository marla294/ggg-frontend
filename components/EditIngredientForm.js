import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import PropTypes, { useState } from 'react';
import useForm from '../lib/useForm';
import { DELETE_INGREDIENT_IMAGE_MUTATION } from './Buttons/DeleteIngredientButton';
import DisplayError from './ErrorMessage';
import { SINGLE_INGREDIENT_QUERY } from './SingleIngredient';
import FormStyles from './styles/FormStyles';
import aisles from '../lib/aisles';
import homeAreas from '../lib/homeAreas';
import stores from '../lib/stores';
import units from '../lib/units';
import AlertMessage from './AlertMessage';

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

function EditIngredientForm({ id }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const { data, loading } = useQuery(SINGLE_INGREDIENT_QUERY, {
    variables: {
      id,
    },
  });

  const [editIngredient, { error: editError, loading: editLoading }] =
    useMutation(UPDATE_INGREDIENT_MUTATION);

  const [editIngredientImage] = useMutation(UPDATE_INGREDIENT_IMAGE_MUTATION);

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
          await editIngredientImage({
            variables: {
              id,
              name: inputs.name,
              image: inputs.image,
            },
          }).catch(console.error);
        }
        await editIngredient({
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
        const date = new Date();
        setSuccessMessage(
          `Ingredient has been edited successfully (${date.toLocaleString(
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
        <h2>Edit Ingredient</h2>
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
            {stores.map((store) => (
              <option value={store} key={store}>
                {store}
              </option>
            ))}
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
            {units.map((unit) => (
              <option value={unit} key={unit}>
                {unit}
              </option>
            ))}
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
            {aisles.map((aisle) => (
              <option value={aisle} key={aisle}>
                {aisle}
              </option>
            ))}
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
            {homeAreas.map((homeArea) => (
              <option value={homeArea} key={homeArea}>
                {homeArea}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="submit">
          Submit
        </button>
        <button type="button" className="clear" onClick={resetForm}>
          Reset
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

EditIngredientForm.propTypes = {
  id: PropTypes.string,
};

export default EditIngredientForm;

export { UPDATE_INGREDIENT_IMAGE_MUTATION };
