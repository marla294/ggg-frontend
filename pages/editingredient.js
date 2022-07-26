/* eslint-disable react/prop-types */
import EditIngredientForm from '../components/EditIngredientForm';

function EditIngredientPage({ query }) {
  return (
    <div>
      <EditIngredientForm id={query?.id} />
    </div>
  );
}

export default EditIngredientPage;
