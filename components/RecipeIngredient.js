/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/img-redundant-alt */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DeleteRecipeItemButton from './DeleteRecipeItemButton';
import ListItemStyles from './styles/ListItemStyles';
import { useUpdateRecipeItemModal } from '../lib/updateRecipeItemState';

const H3Styles = styled.h3`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

function RecipeIngredient({ recipeItemId, ingredient, quantity, recipeItem }) {
  const { openUpdateRecipeItemModal, setRecipeItem } =
    useUpdateRecipeItemModal();

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
        {recipeItemId ? (
          <H3Styles
            onClick={() => {
              openUpdateRecipeItemModal();
              setRecipeItem(recipeItem);
            }}
          >
            {ingredient?.name}
          </H3Styles>
        ) : (
          <h3>{ingredient?.name}</h3>
        )}

        <p>
          amount: {quantity}{' '}
          {ingredient?.units === 'none' ? '' : ingredient?.units}
        </p>
      </div>
      {recipeItemId && (
        <DeleteRecipeItemButton itemId={recipeItemId}>
          &times;
        </DeleteRecipeItemButton>
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
