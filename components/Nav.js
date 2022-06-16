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
    height: 1rem;
    width: 1.5rem;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 1rem;
    @media (min-width: 768px) {
      display: none;
    }
  }

  .mobile-nav-button .line {
    display: block;
    height: 2px;
    width: 100%;
    border-radius: 10px;
    background: var(--purple);
  }
`;

export default function Nav() {
  const user = useUser();
  const { toggleMobileNav } = useMobileNav();
  return (
    <NavStyles>
      {user && (
        <div className="signedInLinks desktop">
          <Link href="/shoppinglist">shopping list</Link>
          <Link href="/recipies">recipes</Link>
          <Link href="/ingredients">ingredients</Link>
          <SignOut />
        </div>
      )}
      {!user && (
        <div className="signedOutLinks desktop">
          <Link href="/signin">sign in</Link>
        </div>
      )}
      <div className="mobile-nav-button" onClick={toggleMobileNav}>
        <span className="line line1" />
        <span className="line line2" />
        <span className="line line3" />
      </div>
    </NavStyles>
  );
}
