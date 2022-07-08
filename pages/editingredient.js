/* eslint-disable react/prop-types */
import EditIngredient from '../components/EditIngredient';

function EditIngredientPage({ query }) {
  return (
    <div>
      <EditIngredient id={query?.id} />
    </div>
  );
}

export default EditIngredientPage;
