import Link from 'next/link';
import styled from 'styled-components';
import SignOut from './SignOut';
import { useUser } from './User';

const NavStyles = styled.nav`
  display: flex;
  justify-self: end;
  font-size: 1rem;
  padding: 0 5rem;

  div {
    display: grid;
    grid-gap: 1rem;
  }

  .signedInLinks {
    grid-template-columns: repeat(5, auto);
    white-space: nowrap;
  }

  .signedOutLinks {
    grid-template-columns: repeat(1, auto);
  }

  button {
    background-color: transparent;
    border: none;
    color: var(--black);
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    :hover {
      text-decoration: underline;
    }
  }
`;

export default function Nav() {
  const user = useUser();
  return (
    <NavStyles>
      {user && (
        <div className="signedInLinks">
          <Link href="/shoppinglist">shopping list</Link>
          <Link href="/recipies">recipes</Link>
          <Link href="/ingredients">ingredients</Link>
          <Link href="/account">account</Link>
          <SignOut />
        </div>
      )}
      {!user && (
        <div className="signedOutLinks">
          <Link href="/signin">sign in</Link>
        </div>
      )}
    </NavStyles>
  );
}
