import Link from 'next/link';
import PropTypes from 'prop-types';
import AddToShoppingList from './AddToShoppingList';
import DeleteIngredient from './DeleteIngredient';
import ButtonStyles from './styles/ButtonStyles';
import ListItemStyles from './styles/ListItemStyles';

function Ingredient({ ingredient }) {
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
        <h3>
          <Link href={`/ingredient/${ingredient?.id}`}>{ingredient?.name}</Link>
        </h3>
        <p>{ingredient?.description}</p>
      </div>
      <ButtonStyles>
        <AddToShoppingList ingredient={ingredient}>
          Add to shopping list
        </AddToShoppingList>
      </ButtonStyles>
      <DeleteIngredient id={ingredient?.id}>&times;</DeleteIngredient>
    </ListItemStyles>
  );
}

Ingredient.propTypes = {
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

export default Ingredient;
