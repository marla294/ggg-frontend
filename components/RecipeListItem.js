import Link from 'next/link';
import PropTypes from 'prop-types';
import ListItemStyles from './styles/ListItemStyles';

function RecipeListItem({ recipe }) {
  return (
    <ListItemStyles key={recipe?.id}>
      {recipe?.photo?.image?.publicUrlTransformed ? (
        <img
          src={recipe?.photo?.image?.publicUrlTransformed}
          alt={recipe?.photo?.altText || recipe?.name}
        />
      ) : (
        <div className="noPhoto" />
      )}
      <div className="details">
        <h2>
          <Link href={`/recipe/${recipe?.id}`}>{recipe?.name}</Link>
        </h2>
      </div>
    </ListItemStyles>
  );
}

RecipeListItem.propTypes = {
  recipe: PropTypes.shape({
    photo: PropTypes.shape({
      image: PropTypes.shape({
        publicUrlTransformed: PropTypes.string,
      }),
      altText: PropTypes.string,
    }),
    name: PropTypes.string,
    id: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default RecipeListItem;
