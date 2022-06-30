import PropTypes from 'prop-types';
import { useUpdateShoppingItemModal } from '../lib/updateShoppingItemState';

function UpdateShoppingListItem({ shoppingListItem, children }) {
  const { openUpdateShoppingItemModal, setShoppingListItem } =
    useUpdateShoppingItemModal();

  return (
    <button
      type="button"
      className="updateShoppingListItem yellow small"
      onClick={() => {
        setShoppingListItem(shoppingListItem);
        openUpdateShoppingItemModal();
      }}
    >
      {children}
    </button>
  );
}

UpdateShoppingListItem.propTypes = {
  shoppingListItem: PropTypes.any,
  children: PropTypes.any,
};

export default UpdateShoppingListItem;
