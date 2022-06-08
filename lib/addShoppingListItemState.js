import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function AddShoppingListItemStateProvider({ children }) {
  const [addShoppingListItemModalOpen, setShoppingListItemModalOpen] =
    useState(false);
  const [ingredient, setIngredient] = useState(false);

  function toggleAddShoppingListItemModal() {
    setShoppingListItemModalOpen(!addShoppingListItemModalOpen);
  }

  function closeAddShoppingListItemModal() {
    setShoppingListItemModalOpen(false);
  }

  function openAddShoppingListItemModal() {
    setShoppingListItemModalOpen(true);
  }

  return (
    <LocalStateProvider
      value={{
        addShoppingListItemModalOpen,
        setShoppingListItemModalOpen,
        ingredient,
        setIngredient,
        toggleAddShoppingListItemModal,
        closeAddShoppingListItemModal,
        openAddShoppingListItemModal,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useAddShoppingListItemModal() {
  const all = useContext(LocalStateContext);
  return all;
}

export { AddShoppingListItemStateProvider, useAddShoppingListItemModal };
