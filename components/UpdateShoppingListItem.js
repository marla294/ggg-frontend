import { useUpdateShoppingItemModal } from '../lib/updateShoppingItemState';

export default function UpdateShoppingListItem({ shoppingListItem, children }) {
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
