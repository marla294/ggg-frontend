import PropTypes from 'prop-types';
import { useEditShoppingItemModal } from '../../lib/editShoppingItemState';
import ButtonStyles from '../styles/ButtonStyles';

function EditShoppingItemItemButton({ shoppingListItem, children }) {
  const { openEditShoppingItemModal, setShoppingListItem } =
    useEditShoppingItemModal();

  return (
    <ButtonStyles
      type="button"
      className="link editShoppingListButton"
      onClick={() => {
        setShoppingListItem(shoppingListItem);
        openEditShoppingItemModal();
      }}
    >
      {children}
    </ButtonStyles>
  );
}

EditShoppingItemItemButton.propTypes = {
  shoppingListItem: PropTypes.any,
  children: PropTypes.any,
};

export default EditShoppingItemItemButton;
