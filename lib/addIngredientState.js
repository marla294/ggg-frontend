import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function AddIngredientStateProvider({ children }) {
  const [addIngredientModalOpen, setAddIngredientModalOpen] = useState(false);
  const [ingredient, setIngredient] = useState(false);

  function toggleAddIngredientModal() {
    setAddIngredientModalOpen(!addIngredientModalOpen);
  }

  function closeAddIngredientModal() {
    setAddIngredientModalOpen(false);
  }

  function openAddIngredientModal() {
    setAddIngredientModalOpen(true);
  }

  return (
    <LocalStateProvider
      value={{
        addIngredientModalOpen,
        setAddIngredientModalOpen,
        ingredient,
        setIngredient,
        toggleAddIngredientModal,
        closeAddIngredientModal,
        openAddIngredientModal,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useAddIngredientModal() {
  const all = useContext(LocalStateContext);
  return all;
}

export { AddIngredientStateProvider, useAddIngredientModal };
