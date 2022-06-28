/* eslint-disable jsx-a11y/img-redundant-alt */
import Link from 'next/link';
import PropTypes from 'prop-types';
import DeleteRecipeItem from './DeleteRecipeItem';
import ListItemStyles from './styles/ListItemStyles';

function RecipeIngredient({ recipeItemId, ingredient, quantity }) {
  return (
    <ListItemStyles>
      {ingredient?.photo?.image?.publicUrlTransformed ? (
        <img
          src={ingredient?.photo?.image?.publicUrlTransformed}
          alt={ingredient?.photo?.altText}
        />
      ) : (
        <div className="noPhoto" />
      )}
      <div className="details">
        <h3>
          <Link href={`/ingredient/${ingredient?.id}`}>{ingredient?.name}</Link>
        </h3>
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
};

export default RecipeIngredient;
