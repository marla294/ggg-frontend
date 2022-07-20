/* eslint-disable jsx-a11y/img-redundant-alt */
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DeleteShoppingListItemButton from './DeleteShoppingListItemButton';
import ListItemStyles from './styles/ListItemStyles';
import EditShoppingListItemButton from './EditShoppingListItemButton';
import roundQuantity from '../lib/roundQuantity';

const ButtonDivStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  width: 100%;
`;

function ShoppingListItem({ itemId, ingredient, quantity, shoppingListItem }) {
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
          Amount: {roundQuantity(quantity / 10)}{' '}
          {ingredient?.units === 'none' ? '' : ingredient?.units}
        </p>
      </div>
      <ButtonDivStyles>
        <EditShoppingListItemButton shoppingListItem={shoppingListItem}>
          Edit
        </EditShoppingListItemButton>
        <DeleteShoppingListItemButton itemId={itemId}>
          Remove
        </DeleteShoppingListItemButton>
      </ButtonDivStyles>
    </ListItemStyles>
  );
}

ShoppingListItem.propTypes = {
  itemId: PropTypes.string,
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
  shoppingListItem: PropTypes.any,
};

export default ShoppingListItem;
