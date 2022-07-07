import PropTypes from 'react';
import EditIngredient from '../components/EditIngredient';

function EditIngredientPage({ query }) {
  return (
    <div>
      <EditIngredient id={query?.id} />
    </div>
  );
}

EditIngredientPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default EditIngredientPage;
