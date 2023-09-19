import Link from 'next/link';
import PropTypes from 'prop-types';
import ListItemStyles from './styles/ListItemStyles';

function IngredientListItem({ ingredient }) {
  return (
    <ListItemStyles>
      {ingredient?.photo?.image?.publicUrlTransformed ? (
        <img
          src={ingredient?.photo?.image?.publicUrlTransformed}
          alt={ingredient?.photo?.altText || ingredient?.name}
        />
      ) : (
        <div className="noPhoto" />
      )}

      <div className="details">
        <h2>
          <Link href={`/ingredient/${ingredient?.id}`}>{ingredient?.name}</Link>
        </h2>
      </div>
    </ListItemStyles>
  );
}

IngredientListItem.propTypes = {
  ingredient: PropTypes.shape({
    photo: PropTypes.shape({
      image: PropTypes.shape({
        publicUrlTransformed: PropTypes.string,
      }),
      altText: PropTypes.string,
    }),
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default IngredientListItem;
