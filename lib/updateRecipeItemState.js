import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function UpdateRecipeItemStateProvider({ children }) {
  const [updateRecipeItemModalOpen, setUpdateRecipeItemModalOpen] =
    useState(false);

  const [recipeItem, setRecipeListItem] = useState(null);

  function toggleUpdateRecipeItemModal() {
    setUpdateRecipeItemModalOpen(!updateRecipeItemModalOpen);
  }

  function closeUpdateRecipeItemModal() {
    setUpdateRecipeItemModalOpen(false);
  }

  function openUpdateRecipeItemModal() {
    setUpdateRecipeItemModalOpen(true);
  }

  return (
    <LocalStateProvider
      value={{
        recipeItem,
        setRecipeListItem,
        updateRecipeItemModalOpen,
        setUpdateRecipeItemModalOpen,
        toggleUpdateRecipeItemModal,
        closeUpdateRecipeItemModal,
        openUpdateRecipeItemModal,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useUpdateRecipeItemModal() {
  const all = useContext(LocalStateContext);
  return all;
}

UpdateRecipeItemStateProvider.propTypes = {
  children: PropTypes.any,
};

export { UpdateRecipeItemStateProvider, useUpdateRecipeItemModal };
