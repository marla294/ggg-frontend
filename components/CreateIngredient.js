import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_INGREDIENTS_QUERY } from './UpdateIngredient';
import FormStyles from './styles/FormStyles';

const CREATE_INGREDIENT_MUTATION = gql`
  mutation CREATE_INGREDIENT_MUTATION(
    $name: String!
    $description: String!
    $store: String
    $units: String
    $aisle: String
    $homeArea: String
    $image: Upload
  ) {
    createIngredient(
      data: {
        name: $name
        description: $description
        store: $store
        units: $units
        aisle: $aisle
        homeArea: $homeArea
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
    }
  }
`;

export default function CreateIngredient() {
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    description: '',
    store: 'uncategorized',
    units: 'uncategorized',
    aisle: 'uncategorized',
    homeArea: 'uncategorized',
  });
  const [createIngredient, { loading, error, data }] = useMutation(
    CREATE_INGREDIENT_MUTATION,
    {
      variables: inputs,
      refetchQueries: 'all',
    }
  );
  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await createIngredient();
        clearForm();
        Router.push({
          pathname: `/ingredient/${res.data.createIngredient.id}`,
        });
      }}
    >
      <fieldset disabled={loading}>
        <h2>Create New Ingredient</h2>
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
            <option value="whole foods">whole foods</option>
            <option value="family fare">family fare</option>
            <option value="hyvee">hyvee</option>
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
            <option value="uncategorized">uncategorized</option>
            <option value="oz">oz</option>
            <option value="tbs">tbs</option>
            <option value="tsp">tsp</option>
            <option value="can">can</option>
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
            <option value="produce">produce</option>
            <option value="meat">meat</option>
            <option value="dairy">dairy</option>
            <option value="canned goods">canned goods</option>
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
            <option value="pantry">pantry</option>
            <option value="fridge">fridge</option>
            <option value="freezer">freezer</option>
            <option value="kitchen">kitchen</option>
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
