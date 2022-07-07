/* eslint-disable react/prop-types */
import EditRecipe from '../components/EditRecipe';

function EditRecipePage({ query }) {
  return (
    <div>
      <EditRecipe id={query?.id} />
    </div>
  );
}

export default EditRecipePage;
