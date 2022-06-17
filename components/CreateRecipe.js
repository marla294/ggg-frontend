import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';
import { UPDATE_INGREDIENT_IMAGE_MUTATION } from './UpdateIngredient';

// const CREATE_INGREDIENT_MUTATION = gql`
//   mutation CREATE_INGREDIENT_MUTATION(
//     $name: String!
//     $description: String!
//     $store: String
//     $units: String
//     $aisle: String
//     $homeArea: String
//   ) {
//     createIngredient(
//       data: {
//         name: $name
//         description: $description
//         store: $store
//         units: $units
//         aisle: $aisle
//         homeArea: $homeArea
//       }
//     ) {
//       id
//     }
//   }
// `;

export default function CreateRecipe() {
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    description: '',
    store: 'uncategorized',
    units: 'none',
    aisle: 'uncategorized',
    homeArea: 'uncategorized',
  });
  // const [createIngredient, { loading, error }] = useMutation(
  //   CREATE_INGREDIENT_MUTATION,
  //   {
  //     variables: inputs,
  //     refetchQueries: 'all',
  //   }
  // );
  // const [updateIngredientImage] = useMutation(UPDATE_INGREDIENT_IMAGE_MUTATION);
  return (
    <FormStyles
    // onSubmit={async (e) => {
    //   e.preventDefault();
    //   const res = await createIngredient();
    //   if (inputs.image && res?.data?.createIngredient?.id) {
    //     await updateIngredientImage({
    //       variables: {
    //         id: res?.data?.createIngredient?.id,
    //         name: inputs.name,
    //         image: inputs.image,
    //       },
    //     }).catch(console.error);
    //   }
    //   clearForm();
    //   Router.push({
    //     pathname: `/ingredients`,
    //   });
    // }}
    >
      <fieldset>
        <h2>Create New Recipe</h2>
        {/* <DisplayError error={error} /> */}
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
