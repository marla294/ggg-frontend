/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link';
import styled from 'styled-components';
import { useMobileNav } from '../lib/mobileNavState';
import { useUser } from './User';

const MobileNavStyles = styled.div`
  position: fixed;
  top: 4.4rem;
  left: 0;
  display: none;
  background-color: white;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  z-index: 110;
  &.open {
    display: grid;
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

const InnerMobileNavStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  font-size: 1.1rem;

  a {
    padding: 1.5rem 2.5rem;
    border-bottom: 0.5px solid var(--lightGray);
  }
`;

export default function MobileNav() {
  const user = useUser();
  const { mobileNavOpen, closeMobileNav } = useMobileNav();

  const clickHandler = () => {
    closeMobileNav();
  };

  return (
    <MobileNavStyles className={mobileNavOpen ? 'open' : ''}>
      {user && (
        <InnerMobileNavStyles>
          <Link href="/shoppinglist">
            <a onClick={clickHandler}>Shopping list</a>
          </Link>
          <Link href="/recipes">
            <a onClick={clickHandler}>Recipes</a>
          </Link>
          <Link href="/ingredients">
            <a onClick={clickHandler}>Ingredients</a>
          </Link>
          <Link href="/account">
            <a onClick={clickHandler}>Your Account</a>
          </Link>
        </InnerMobileNavStyles>
      )}
      {!user && (
        <InnerMobileNavStyles>
          <Link href="/signin">
            <a onClick={clickHandler}>Sign in</a>
          </Link>
        </InnerMobileNavStyles>
      )}
    </MobileNavStyles>
  );
}
