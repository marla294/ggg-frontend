/* eslint-disable react/prop-types */
import EditRecipeForm from '../components/EditRecipeForm';

function EditRecipePage({ query }) {
  return (
    <div>
      <EditRecipeForm id={query?.id} />
    </div>
  );
}

export default EditRecipePage;
