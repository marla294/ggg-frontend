import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function EditRecipeItemStateProvider({ children }) {
  const [editRecipeItemModalOpen, setEditRecipeItemModalOpen] = useState(false);

  const [recipeItem, setRecipeItem] = useState(null);

  function toggleEditRecipeItemModal() {
    setEditRecipeItemModalOpen(!editRecipeItemModalOpen);
  }

  function closeEditRecipeItemModal() {
    setEditRecipeItemModalOpen(false);
  }

  function openEditRecipeItemModal() {
    setEditRecipeItemModalOpen(true);
  }

  return (
    <LocalStateProvider
      value={{
        recipeItem,
        setRecipeItem,
        editRecipeItemModalOpen,
        setEditRecipeItemModalOpen,
        toggleEditRecipeItemModal,
        closeEditRecipeItemModal,
        openEditRecipeItemModal,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useEditRecipeItemModal() {
  const all = useContext(LocalStateContext);
  return all;
}

EditRecipeItemStateProvider.propTypes = {
  children: PropTypes.any,
};

export { EditRecipeItemStateProvider, useEditRecipeItemModal };
