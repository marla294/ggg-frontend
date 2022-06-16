import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function MobileNavStateProvider({ children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function closeMobileNav() {
    setMobileNavOpen(false);
  }

  function openMobileNav() {
    setMobileNavOpen(true);
  }

  function toggleMobileNav() {
    setMobileNavOpen(!mobileNavOpen);
  }

  return (
    <LocalStateProvider
      value={{
        mobileNavOpen,
        setMobileNavOpen,
        closeMobileNav,
        openMobileNav,
        toggleMobileNav,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useMobileNav() {
  const all = useContext(LocalStateContext);
  return all;
}

export { MobileNavStateProvider, useMobileNav };
