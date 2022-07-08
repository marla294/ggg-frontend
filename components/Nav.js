/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link';
import styled from 'styled-components';
import { useMobileNav } from '../lib/mobileNavState';
import SignOut from './SignOut';
import { useUser } from './User';

const NavStyles = styled.nav`
  display: flex;
  justify-self: end;
  align-items: center;
  height: 100%;
  font-size: 1rem;

  @media (min-width: 768px) {
    padding: 0 1rem;
  }
  .desktop {
    display: none;
    @media (min-width: 768px) {
      display: grid;
      grid-gap: 1rem;
    }
  }

  .signedInLinks {
    grid-template-columns: repeat(4, auto);
    white-space: nowrap;
  }

  .signedOutLinks {
    grid-template-columns: repeat(1, auto);
  }

  .mobile-nav-button {
    display: block;
    height: 1.3rem;
    width: 1.6rem;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 2rem;
    @media (min-width: 768px) {
      display: none;
    }
  }

  .mobile-nav-button .line {
    display: block;
    height: 2px;
    width: 100%;
    border-radius: 5px;
    background: var(--purple);
    transition: transform 0.2s ease-in-out;
  }

  .mobile-nav-button .line1 {
    transform-origin: 0% 0%;
    transition: transform 0.2s ease-in-out;
  }

  .mobile-nav-button .line2 {
    transition: transform 0.2s ease-in-out;
  }

  .mobile-nav-button .line3 {
    transform-origin: 0% 100%;
    transition: transform 0.2s ease-in-out;
  }

  .open .line1 {
    transform: rotate(45deg);
  }
  .open .line2 {
    transform: scaleY(0);
  }
  .open .line3 {
    transform: rotate(-45deg);
  }
`;

export default function Nav() {
  const user = useUser();
  const { mobileNavOpen, toggleMobileNav } = useMobileNav();

  return (
    <NavStyles>
      {user && (
        <div className="signedInLinks desktop">
          <Link href="/shoppinglist">Shopping List</Link>
          <Link href="/recipes">Recipes</Link>
          <Link href="/ingredients">Ingredients</Link>
          <SignOut />
        </div>
      )}
      {!user && (
        <div className="signedOutLinks desktop">
          <Link href="/signin">Sign in</Link>
        </div>
      )}
      <div
        className={
          mobileNavOpen ? 'mobile-nav-button open' : 'mobile-nav-button'
        }
        onClick={toggleMobileNav}
      >
        <span className="line line1" />
        <span className="line line2" />
        <span className="line line3" />
      </div>
    </NavStyles>
  );
}
