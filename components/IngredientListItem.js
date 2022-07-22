import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddToShoppingListButton from './AddToShoppingListButton';
import DeleteIngredientButton from './DeleteIngredientButton';
import ListItemStyles from './styles/ListItemStyles';

const ButtonDivStyles = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  width: 100%;
`;

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
        <h3>
          <Link href={`/ingredient/${ingredient?.id}`}>{ingredient?.name}</Link>
        </h3>
        <p>{ingredient?.description}</p>
      </div>
      <ButtonDivStyles>
        <AddToShoppingListButton ingredient={ingredient}>
          Add to shopping list
        </AddToShoppingListButton>
      </ButtonDivStyles>
      <DeleteIngredientButton id={ingredient?.id}>
        &times;
      </DeleteIngredientButton>
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
