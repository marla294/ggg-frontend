import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';
import { UPDATE_INGREDIENT_IMAGE_MUTATION } from './EditIngredientForm';
import aisles from '../lib/aisles';
import homeAreas from '../lib/homeAreas';
import stores from '../lib/stores';
import units from '../lib/units';
import AlertMessage from './AlertMessage';

const CREATE_INGREDIENT_MUTATION = gql`
  mutation CREATE_INGREDIENT_MUTATION(
    $name: String!
    $description: String!
    $store: String
    $units: String
    $aisle: String
    $homeArea: String
  ) {
    createIngredient(
      data: {
        name: $name
        description: $description
        store: $store
        units: $units
        aisle: $aisle
        homeArea: $homeArea
      }
    ) {
      id
    }
  }
`;

export default function CreateIngredientForm() {
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    description: '',
    store: stores[0],
    units: units[0],
    aisle: aisles[0],
    homeArea: homeAreas[0],
  });
  const [createIngredient, { loading, error }] = useMutation(
    CREATE_INGREDIENT_MUTATION,
    {
      variables: inputs,
      refetchQueries: 'all',
    }
  );
  const [updateIngredientImage] = useMutation(UPDATE_INGREDIENT_IMAGE_MUTATION);
  const [successMessage, setSuccessMessage] = useState(null);
  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await createIngredient();
        if (inputs.image && res?.data?.createIngredient?.id) {
          await updateIngredientImage({
            variables: {
              id: res?.data?.createIngredient?.id,
              name: inputs.name,
              image: inputs.image,
            },
          }).catch(console.error);
        }
        clearForm();
        setSuccessMessage(`Ingredient "${inputs.name}" created successfully`);
      }}
    >
      <Head>
        <title>Create New Ingredient | Go Get Ur Groceries</title>
      </Head>
      <fieldset disabled={loading}>
        <h2>Create New Ingredient</h2>
        <DisplayError error={error} />
        <AlertMessage message={successMessage} />
        <label htmlFor="name">
          Name<span className="required">&nbsp;*</span>
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Name"
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
            placeholder="Description"
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
          Create Ingredient
        </button>
        <button type="button" className="clear" onClick={clearForm}>
          Clear Form
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
