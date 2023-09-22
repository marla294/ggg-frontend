/* eslint-disable jsx-a11y/img-redundant-alt */
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import DeleteShoppingListItemButton, {
  DELETE_SHOPPING_LIST_ITEM_MUTATION,
} from './Buttons/DeleteShoppingListItemButton';
import ListItemStyles from './styles/ListItemStyles';
import EditShoppingListItemButton from './Buttons/EditShoppingListItemButton';
import roundQuantity from '../lib/roundQuantity';

const ButtonDivStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  width: 100%;
`;

function ShoppingListItem({ itemId, ingredient, quantity, shoppingListItem }) {
  const [deleteItem, { loading: loadingDelete }] = useMutation(
    DELETE_SHOPPING_LIST_ITEM_MUTATION,
    {
      variables: {
        id: itemId,
      },
      refetchQueries: 'all',
    }
  );

  return (
    <ListItemStyles className={`${loadingDelete ? 'loadingDelete' : ''}`}>
      {ingredient?.photo?.image?.publicUrlTransformed ? (
        <img
          src={ingredient?.photo?.image?.publicUrlTransformed}
          alt={ingredient?.photo?.altText}
        />
      ) : (
        <div className="noPhoto" />
      )}
      <div className="details">
        <h2>
          <Link href={`/ingredient/${ingredient?.id}`}>{ingredient?.name}</Link>
          <DeleteShoppingListItemButton itemId={itemId} deleteItem={deleteItem}>
            &times;
          </DeleteShoppingListItemButton>
        </h2>
        <h3>
          <EditShoppingListItemButton shoppingListItem={shoppingListItem}>
            Amount: {roundQuantity(quantity / 10)}{' '}
            {ingredient?.units === 'none' ? '' : ingredient?.units}
          </EditShoppingListItemButton>
        </h3>
      </div>
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
