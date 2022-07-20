import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function EditShoppingItemStateProvider({ children }) {
  const [editShoppingItemModalOpen, setEditShoppingItemModalOpen] =
    useState(false);

  const [shoppingListItem, setShoppingListItem] = useState(null);

  function toggleEditShoppingItemModal() {
    setEditShoppingItemModalOpen(!editShoppingItemModalOpen);
  }

  function closeEditShoppingItemModal() {
    setEditShoppingItemModalOpen(false);
  }

  function openEditShoppingItemModal() {
    setEditShoppingItemModalOpen(true);
  }

  return (
    <LocalStateProvider
      value={{
        shoppingListItem,
        setShoppingListItem,
        editShoppingItemModalOpen,
        setEditShoppingItemModalOpen,
        toggleEditShoppingItemModal,
        closeEditShoppingItemModal,
        openEditShoppingItemModal,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useEditShoppingItemModal() {
  const all = useContext(LocalStateContext);
  return all;
}

EditShoppingItemStateProvider.propTypes = {
  children: PropTypes.any,
};

export { EditShoppingItemStateProvider, useEditShoppingItemModal };
