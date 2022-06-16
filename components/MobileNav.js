import Link from 'next/link';
import styled from 'styled-components';
import { useMobileNav } from '../lib/mobileNavState';
import SignOut from './SignOut';
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

  .signOutButton {
    text-align: left;
    font-size: 1.1rem;
    line-height: 2;
  }

  a,
  .signOutButton {
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
            <a onClick={clickHandler}>shopping list</a>
          </Link>
          <Link href="/recipies">
            <a onClick={clickHandler}>recipes</a>
          </Link>
          <Link href="/ingredients">
            <a onClick={clickHandler}>ingredients</a>
          </Link>
          <SignOut />
        </InnerMobileNavStyles>
      )}
      {!user && (
        <InnerMobileNavStyles>
          <Link href="/signin">
            <a onClick={clickHandler}>sign in</a>
          </Link>
        </InnerMobileNavStyles>
      )}
    </MobileNavStyles>
  );
}
