/* eslint-disable jsx-a11y/img-redundant-alt */
import Link from 'next/link';
import PropTypes from 'prop-types';
import DeleteRecipeItem from './DeleteRecipeItem';
import ListItemStyles from './styles/ListItemStyles';
import { useUpdateRecipeItemModal } from '../lib/updateRecipeItemState';

function RecipeIngredient({ recipeItemId, ingredient, quantity, recipeItem }) {
  const { openUpdateRecipeItemModal, setRecipeItem } =
    useUpdateRecipeItemModal();

  return (
    <ListItemStyles
      onClick={() => {
        if (recipeItemId) {
          openUpdateRecipeItemModal();
          setRecipeItem(recipeItem);
        }
      }}
    >
      {ingredient?.photo?.image?.publicUrlTransformed ? (
        <img
          src={ingredient?.photo?.image?.publicUrlTransformed}
          alt={ingredient?.photo?.altText}
        />
      ) : (
        <div className="noPhoto" />
      )}
      <div className="details">
        <h3>{ingredient?.name}</h3>
        <p>
          amount: {quantity}{' '}
          {ingredient?.units === 'none' ? '' : ingredient?.units}
        </p>
      </div>
      {recipeItemId && (
        <DeleteRecipeItem itemId={recipeItemId}>&times;</DeleteRecipeItem>
      )}
    </ListItemStyles>
  );
}

RecipeIngredient.propTypes = {
  recipeItemId: PropTypes.string,
  ingredient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    units: PropTypes.string,
    name: PropTypes.string.isRequired,
    photo: PropTypes.shape({
      image: PropTypes.shape({
        publicUrlTransformed: PropTypes.string,
      }),
      altText: PropTypes.string,
    }),
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  recipeItem: PropTypes.object,
};

export default RecipeIngredient;
