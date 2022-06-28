import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function AddRecipeItemStateProvider({ children }) {
  const [addRecipeItemModalOpen, setAddRecipeItemModalOpen] = useState(false);

  const [ingredient, setIngredient] = useState(false);
  const [recipeId, setRecipeId] = useState(false);

  function toggleAddRecipeItemModal() {
    setAddRecipeItemModalOpen(!addRecipeItemModalOpen);
  }

  function closeAddRecipeItemModal() {
    setAddRecipeItemModalOpen(false);
  }

  function openAddRecipeItemModal() {
    setAddRecipeItemModalOpen(true);
  }

  return (
    <LocalStateProvider
      value={{
        addRecipeItemModalOpen,
        setAddRecipeItemModalOpen,
        ingredient,
        setIngredient,
        recipeId,
        setRecipeId,
        toggleAddRecipeItemModal,
        closeAddRecipeItemModal,
        openAddRecipeItemModal,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useAddRecipeItemModal() {
  const all = useContext(LocalStateContext);
  return all;
}

export { AddRecipeItemStateProvider, useAddRecipeItemModal };
