/* eslint-disable jsx-a11y/img-redundant-alt */
import Link from 'next/link';
import PropTypes from 'prop-types';
import DeleteShoppingListItemButton from './DeleteShoppingListItemButton';
import ButtonStyles from './styles/ButtonStyles';
import ListItemStyles from './styles/ListItemStyles';
import UpdateShoppingListItem from './UpdateShoppingListItem';

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
          Amount: {quantity}{' '}
          {ingredient?.units === 'none' ? '' : ingredient?.units}
        </p>
      </div>
      <ButtonStyles>
        <UpdateShoppingListItem shoppingListItem={shoppingListItem}>
          Update
        </UpdateShoppingListItem>
        <DeleteShoppingListItemButton itemId={itemId}>
          Remove
        </DeleteShoppingListItemButton>
      </ButtonStyles>
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
