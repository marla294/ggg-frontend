import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function MobileNavStateProvider({ children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const router = useRouter();

  function closeMobileNav() {
    setMobileNavOpen(false);
  }

  function openMobileNav() {
    setMobileNavOpen(true);
  }

  function toggleMobileNav() {
    setMobileNavOpen(!mobileNavOpen);
  }

  useEffect(() => {
    closeMobileNav();
  }, [router.pathname]);

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
