import Link from 'next/link';
import styled from 'styled-components';
import SignOut from './SignOut';
import { useUser } from './User';

const NavStyles = styled.nav`
  display: flex;
  justify-self: end;
  font-size: 1.25rem;

  div {
    display: grid;
    grid-template-columns: repeat(10, auto);
    grid-gap: 1rem;
  }
`;

export default function Nav() {
  const user = useUser();
  return (
    <NavStyles>
      <div>
        {user && (
          <>
            <Link href="/shoppinglist">shopping list</Link>
            <Link href="/recipies">recipes</Link>
            <Link href="/ingredients">ingredients</Link>
            <Link href="/account">ur account</Link>
            <SignOut />
          </>
        )}
        {!user && (
          <>
            <Link href="/signin">sign in</Link>
          </>
        )}
      </div>
    </NavStyles>
  );
}
