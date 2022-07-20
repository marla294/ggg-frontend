import PropTypes from 'prop-types';
import { useUpdateShoppingItemModal } from '../lib/updateShoppingItemState';
import ButtonStyles from './styles/ButtonStyles';

function UpdateShoppingListItemButton({ shoppingListItem, children }) {
  const { openUpdateShoppingItemModal, setShoppingListItem } =
    useUpdateShoppingItemModal();

  return (
    <ButtonStyles
      type="button"
      className="updateShoppingListItem yellow small"
      onClick={() => {
        setShoppingListItem(shoppingListItem);
        openUpdateShoppingItemModal();
      }}
    >
      {children}
    </ButtonStyles>
  );
}

UpdateShoppingListItemButton.propTypes = {
  shoppingListItem: PropTypes.any,
  children: PropTypes.any,
};

export default UpdateShoppingListItemButton;
